import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// API Key ko process.env se load kar rahe hain
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default ai;
