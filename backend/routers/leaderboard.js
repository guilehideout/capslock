import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboard.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.route('/leaderboard').get(requireAuth, getLeaderboard);

export default router;