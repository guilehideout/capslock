import { createClient } from "@supabase/supabase-js";
import { ApiError } from "../utils/ApiError.js";

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json(new ApiError(400, "Missing token"));

  const supabaseUser = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      global: { headers: { Authorization: `Bearer ${token}` } }
    }
  );

  const { data: { user }, error } = await supabaseUser.auth.getUser();
  if (error || !user) return res.status(401).json(new ApiError(401, "Invalid token"));

  req.user = user; // attach to request
  req.supabase = supabaseUser;
  next();
}