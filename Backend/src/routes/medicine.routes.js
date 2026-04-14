import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMedicineText } from "../validators/medicine.validator.js";

import { upload } from "../middlewares/multer.js";

import { deleteHistory } from "../controllers/medicine.controller.js";
import {
  analyzeText,
  analyzeImage,
  getSearchHistory,
} from "../controllers/medicine.controller.js";

router.post("/analyze-text", authMiddleware, validateMedicineText, analyzeText);

router.post(
  "/analyze-image",
  authMiddleware,
  upload.single("image"),
  analyzeImage,
);

router.get("/history", authMiddleware, getSearchHistory);
router.delete("/deletehistory/:id", authMiddleware,deleteHistory);

export default router;
