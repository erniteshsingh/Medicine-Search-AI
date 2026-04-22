import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contact", authMiddleware, submitContactForm);

export default router;
