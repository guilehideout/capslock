import supabase, { superSupabase } from "../config/supabaseClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkEmptyStringAndTrim, checkRequired } from "../utils/validator.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

/**
 * Validate report description using Python service
 */
async function validateReportDescription(description) {
  const cleaned = checkEmptyStringAndTrim(description, "Report Description");
  if (cleaned.length > 100) throw new ApiError(400, "Description too long");

  try {
    const { data } = await axios.post(
      `${process.env.FLASK_URL}/classify-text`,
      { text: cleaned }
    );

    return data;
  } catch (err) {
    console.error("Error calling Python Text API:", err.message);
    throw new ApiError(500, "Text validation service unavailable");
  }
}

/**
 * Validate report image with Python service
 */
async function classifyReportImage(filePath) {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  try {
    const { data } = await axios.post(
      `${process.env.FLASK_URL}/classify-image`,
      formData,
      { headers: formData.getHeaders() }
    );

    if (data.validity === "invalid") {
      throw new ApiError(400, "Invalid report image");
    }
    return data;
  } catch (err) {
    console.error("Error calling Python Image API:", err.message);
    throw new ApiError(500, "Image validation service unavailable");
  }
}

/**
 * Upload image to Supabase Storage
 */
async function uploadReportImage(file) {
  const filename = `reports/${Date.now()}_${file.originalname}`;
  const fileBuffer = fs.readFileSync(file.path);

  const { error } = await superSupabase.storage
    .from("images")
    .upload(filename, fileBuffer, { contentType: file.mimetype });

  if (error) throw new ApiError(400, error.message);

  const { data } = superSupabase.storage.from("images").getPublicUrl(filename);
  return data.publicUrl;
}

/**
 * Submit a new report
 */
const submitReport = asyncHandler(async (req, res) => {
  const { description, location } = req.body;
  const user_id = req.user.id;
  const imageFile = req.file;

  checkRequired(user_id, "User Id");
  if (!imageFile) throw new ApiError(400, "Image is required");

  // 1. Validate description
  const textValidation = await validateReportDescription(description);
  console.log(textValidation);

  // 2. Classify image
  const imageValidation = await classifyReportImage(imageFile.path);

  console.log(imageValidation);

  // 3. Upload image
  const photoUrl = await uploadReportImage(imageFile);

  // 4. Fetch user profile (bypass RLS with superSupabase)
  const { data: user, error: fetchError } = await superSupabase
    .from("profiles")
    .select("points")
    .eq("user_id", user_id)
    .single();

  if (fetchError || !user) throw new ApiError(404, "User not found");

  // 5. Increment user points (+10)
  const { error: updateError } = await superSupabase
    .from("profiles")
    .update({ points: user.points + 10 })
    .eq("user_id", user_id);

  if (updateError) throw new ApiError(400, "Could not update user points");

  let validity = (textValidation.validity === "valid" && imageValidation.prediction === "mangrove");
  // 6. Insert report
  const { error: insertError } = await supabase.from("reports").insert({
    user_id,
    photo_url: photoUrl,
    description,
    location,
    category: textValidation.category || imageValidation.category || null,
    validity: validity
  });

  if (insertError) throw new ApiError(400, insertError.message);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        photoUrl,
        textValidation,
        imageValidation,
        validity
      },
      "Report submitted successfully"
    )
  );
});

/**
 * Get reports for logged-in user
 */
const getUserReports = asyncHandler(async (req, res) => {
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new ApiError(400, error.message);

  res.status(200).json(new ApiResponse(200, data, "Reports retrieved successfully"));
});

const getAllReports = asyncHandler(async(req, res) => {
  try {
    if (!req.user.user_metadata?.is_admin) {
      return res.status(403).json({ error: "Forbidden: not an admin" });
    }

    // Query reports using the user's JWT (enforces RLS policies automatically)
    const { data, error } = await supabase
      .from("reports")
      .select("*");

    if (error) throw error;

    res.status(200).json(new ApiResponse(200, data, error));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})

export { submitReport, getUserReports, getAllReports };
