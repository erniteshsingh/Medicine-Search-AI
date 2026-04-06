export const validateMedicineText = (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Text is required",
    });
  }

  if (typeof text !== "string") {
    return res.status(400).json({
      success: false,
      message: "Text must be string",
    });
  }

  next();
};
