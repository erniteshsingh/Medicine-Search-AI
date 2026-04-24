import express from "express";

const router = express.Router();
import { signup, login, logout } from "../controllers/auth.controller.js";

import { signupValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/signup", signupValidator, validate, signup);

router.post("/login", login);

router.post("/logoutuser", authMiddleware, logout);


export default router;
