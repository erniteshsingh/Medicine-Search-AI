import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMedicineText } from "../validators/medicine.validator.js";
import { upload } from "../middlewares/multer.js";

import {
  analyzeText,
  analyzeImage,
} from "../controllers/medicine.controller.js";


router.post("/text", authMiddleware, validateMedicineText, analyzeText);

router.post("/analyze-image", authMiddleware, upload.single("image"), analyzeImage);

export default router;
