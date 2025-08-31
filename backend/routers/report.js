import { Router } from "express";
import { submitReport, getUserReports, getAllReports } from "../controllers/report.js";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/report').post(upload.single("image"), requireAuth, submitReport);
router.route('/report-history').get(requireAuth, getUserReports);
router.route('/all-reports').get(requireAuth, getAllReports);

export default router;