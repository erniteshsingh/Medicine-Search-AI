import {
  analyzeMedicineText,
  analyzeMedicineImage,
} from "../services/ai.service.js";
import Medicine from "../models/medicine.model.js";

export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Text is required" });
    }

    const result = await analyzeMedicineText(text);

    await Medicine.create({
      user: req.user._id,
      query: text,
      response: result,
      type: "text",
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("AI Text Error Detail:", error.message);

    const isQuotaError =
      error.status === 429 ||
      error.response?.status === 429 ||
      error.message?.includes("429") ||
      error.message?.toLowerCase().includes("quota");

    if (isQuotaError) {
      return res.status(429).json({
        success: false,
        message: "AI Limit Reached. Our AI brain needs a 30-second break!",
      });
    }

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
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    let query = { user: req.user._id };

    if (search) {
      query.$or = [
        { query: { $regex: search, $options: "i" } },
        { medicineName: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const history = await Medicine.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalRecords = await Medicine.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: history,
      pagination: {
        totalRecords, // Ye frontend pe total count dikhayega
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Backend History Error:", error.message);
    res.status(500).json({
      success: false,
      message: "History fetch karne mein problem hui.",
      error: error.message,
    });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting ID:", id);
    console.log("User from Token:", req.user?._id);

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const deletedRecord = await Medicine.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Record nahi mila ya aap authorized nahi hain.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Medicine history deleted successfully.",
    });
  } catch (error) {
    console.error("Delete History Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server side par error hai.",
      error: error.message,
    });
  }
};
