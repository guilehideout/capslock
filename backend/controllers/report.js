import supabase from "../config/supabaseClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkEmptyStringAndTrim } from "../utils/validator.js";

const submitReport = asyncHandler(async (req, res) => {
  const imagePath = req.file.path;
  let { description, location, user_id } = req.body;
  description = checkEmptyStringAndTrim(description, "Description");

  //  python image processing

  const filename = `reports/${req.file.originalname}`;
  const { error } = await supabase.storage
    .from("images")
    .upload(filename, imagePath);
  if (error) throw new ApiError(400, error.message);

  const publicUrl = await supabase.storage.from("images").getPublicUrl(filename)
    .publicUrl;

  await supabase
    .from("reports")
    .insert({
      user_id,
      photo_url: publicUrl,
      description,
      location,
      status: "pending",
    });

  res
    .status(200)
    .json(new ApiResponse(200, publicUrl, "Image uploaded successfully"));
});

const getUserReports = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  const { data, error } = await supabase
    .from("reports")
    .select("* FROM reports WHERE user_id = $1", [user_id]);
  if (error) return res.status(400).json({ error: error.message });
  res
    .status(200)
    .json(new ApiResponse(200, data, "Reports retrieved successfully"));
});

export { submitReport, getUserReports };
