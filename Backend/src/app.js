import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  }),
);
rigin: ["https://medicine-search-ai.vercel.app", "http://localhost:5173"], 
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes);

import profileRoutes from "./routes/profile.routes.js";
app.use("/api/v1/profile", profileRoutes);

import medicineRoutes from "./routes/medicine.routes.js";
app.use("/api/v1/medicine", medicineRoutes);

import contactRoutes from "./routes/contact.routes.js";

app.use("/api/v1/support", contactRoutes);
export default app;
