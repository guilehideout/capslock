import { Router } from "express";
import { getCurrentUser, getCurrentUserInfo, userLogin, userLogout, userSignUp } from "../controllers/auth.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.route('/signup').post(userSignUp);
router.route('/login').post(userLogin);
router.route('/logout').post(requireAuth, userLogout);
router.route('/user').get(requireAuth, getCurrentUser);
router.route('/me').get(requireAuth, getCurrentUserInfo);

export default router;