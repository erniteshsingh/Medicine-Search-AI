import {
  analyzeMedicineText,
  analyzeMedicineImage,
} from "../services/ai.service.js";
import Medicine from "../models/medicine.model.js";

export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await analyzeMedicineText(text);

    const medicine = await Medicine.create({
      user: req.user._id,
      query: text,
      response: result,
      type: "text",
    });

    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    console.error("AI Text Error:", error);
    res.status(500).json({
      success: false,
      message: "AI processing failed",
      error: error.message,
    });
  }
};

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded." });
    }

    const imageBase64 = req.file.buffer.toString("base64");

    const result = await analyzeMedicineImage(imageBase64, req.file.mimetype);

    const lines = result.split("\n");
    const detectedName = lines[0].trim() || "Unknown Medicine";
    const fullReport = result;

    const medicine = await Medicine.create({
      user: req.user._id,
      query: detectedName,
      response: fullReport,
      type: "image",
      metadata: { originalFile: req.file.originalname },
    });

    res.status(200).json({
      success: true,
      medicineName: detectedName,
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const history = await Medicine.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const totalRecords = await Medicine.countDocuments({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: history.length,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      totalRecords,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "History fetch karne mein problem hui.",
      error: error.message,
    });
  }
};
