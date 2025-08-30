import supabase from "../config/supabaseClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkEmptyStringAndTrim } from "../utils/validator.js";

const getLeaderboard = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, points")
    .order("points", { ascending: false })
    .limit(10);
  if (error) throw new ApiError(400, error.message);
  res.status(200).json(new ApiResponse(200, data, "Leaderboard retriev successfully"));
});

export {
    getLeaderboard
};