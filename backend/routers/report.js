import { Router } from "express";
import { submitReport, getReports, getUserReports } from "../controllers/report.js";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/report').post(requireAuth, upload.single("image"), handleReport);
router.route('/report-history').get(requireAuth, getUserReports);

export default router;