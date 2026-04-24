import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profile.controller.js";
const router = express.Router();

router.get("/me", authMiddleware, getProfile);

router.patch("/update", authMiddleware, updateProfile);

router.patch("/change-password", authMiddleware, changePassword);

export default router;
