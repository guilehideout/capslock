import supabase from "../config/supabaseClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkEmptyStringAndTrim } from "../utils/validator.js";
import { superSupabase } from "../config/supabaseClient.js";


const userSignUp = asyncHandler(async (req, res) => {
  let { username, email, password } = req.body;
  username = checkEmptyStringAndTrim(username, "Username");
  email = checkEmptyStringAndTrim(email, "Email");

  if (!password) {
    throw new ApiError(400, "Password cannot be empty");
  }

  const { data, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (authError) {
    console.log(authError);
    throw new ApiError(400, "Error while signing up");
  }

  // const session = await supabase.auth.getSession();

  const { error: profileError } = await supabase.from("profiles").insert({
    user_id: data.user.id,
    name: username,
    role: "citizen",
    points: 0,
    email: email
  });

  if (profileError) {
    console.log(profileError)
    throw new ApiError(400, "Error updating user info");
  } 

  return res
    .status(200)
    .json(new ApiResponse(200, data, "User signed up successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  email = checkEmptyStringAndTrim(email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("Error while signing in: ", error);
    throw new ApiError(400, "Error while signing in");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, data, "User logged in successfully"));
});

const userLogout = asyncHandler(async (req, res) => {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    console.log("Error while signing out: ", error);
    throw new ApiError(400, "Error while signing out");
  }
  return res.status(200).json(new ApiResponse(200, null, "All good"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { data, error } = await req.supabase.auth.getUser();
  if (error) {
    console.log("Error while retrieving current session: ", error);
    throw new ApiError(400, "Error while retrieving current session");
  }
  return res.status(200).json(new ApiResponse(200, data, "All good"));
});

const getCurrentUserInfo = asyncHandler(async (req, res) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", req.user.id)
    .single();

  if (error) {
    throw new ApiError(400, "Invalid request");
  }

  res.json(profile);
});

// Create an admin user
async function createAdminUser(email, password) {
  const { data, error } = await superSupabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { is_admin: true }
  });

  if (error) throw error;
  return data;
}


export { userSignUp, userLogin, userLogout, getCurrentUser, getCurrentUserInfo };
