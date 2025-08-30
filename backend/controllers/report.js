import supabase from "../config/supabaseClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkEmptyStringAndTrim } from "../utils/validator.js";
import axios from "axios";

/**
 * Validate report description using local rules + external Python service
 */
async function validateReportDescription(description) {
  const cleanedDescription = checkEmptyStringAndTrim(
    description,
    "Report Description"
  );

  if (cleanedDescription.length > 100) {
    throw new ApiError(400, "Description too long");
  }

  try {
    const { data } = await axios.post(
      `${process.env.FLASK_URL}/classify-text`,
      { text: cleanedDescription }
    );
    if (data.validity === "invalid") {
      throw new ApiError(400, "Invalid report description");
    }
    return data;
  } catch (error) {
    console.error(
      "Error calling Python Text API:",
      error.response ? error.response.data : error.message
    );
    throw new ApiError(500, "Text validation service unavailable");
  }
}

/**
 * Classify report image via external Python service
 */
async function classifyReportImage(filePath) {
  try {
    const { data } = await axios.post(
      `${process.env.FLASK_URL}/classify-image`,
      { image_path: filePath } // Flask should handle local or uploaded path
    );
    if (data.validity === "invalid") {
      throw new ApiError(400, "Invalid report image");
    }
    return data;
  } catch (error) {
    console.error(
      "Error calling Python Image API:",
      error.response ? error.response.data : error.message
    );
    throw new ApiError(500, "Image validation service unavailable");
  }
}

/**
 * Upload image to Supabase Storage and return public URL
 */
async function uploadReportImage(file) {
  const filename = `reports/${Date.now()}_${file.originalname}`;
  const { error } = await supabase.storage
    .from("images")
    .upload(filename, file.path);

  if (error) throw new ApiError(400, error.message);

  const { data } = supabase.storage.from("images").getPublicUrl(filename);
  return data.publicUrl;
}

/**
 * Submit a new report
 */
const submitReport = asyncHandler(async (req, res) => {
  const { description, location, user_id } = req.body;
  const imageFile = req.file;

  if (!imageFile) throw new ApiError(400, "Image is required");

  // 1. Validate description
  const validationResult = await validateReportDescription(description);

  // 2. Classify image (before uploading to Supabase)
  const imageClassification = await classifyReportImage(imageFile.path);

  // 3. Upload image to Supabase
  const photoUrl = await uploadReportImage(imageFile);

  // 4. Insert into DB
  const { error } = await supabase.from("reports").insert({
    user_id,
    photo_url: photoUrl,
    description,
    location,
    status: "pending",
    category: validationResult.category || imageClassification.category || null, // merge text + image category if available
  });

  if (error) throw new ApiError(400, error.message);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        photoUrl,
        textValidation: validationResult,
        imageValidation: imageClassification,
      },
      "Report submitted successfully"
    )
  );
});

/**
 * Get all reports for a user
 */
const getUserReports = asyncHandler(async (req, res) => {
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new ApiError(400, error.message);

  res
    .status(200)
    .json(new ApiResponse(200, data, "Reports retrieved successfully"));
});

export { submitReport, getUserReports };
