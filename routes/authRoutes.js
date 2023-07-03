import { Router } from "express";
import {
  registerController,
  loginController,
  verify,
  userAuthController,
} from "../controllers/authController.js";
import userAuth from "../middelwares/authMiddelware.js";
const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/verify/:id", verify);
router.get("/user-auth", userAuth, userAuthController);

export default router;
