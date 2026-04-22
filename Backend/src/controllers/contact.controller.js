import {Contact} from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, phone, issue } = req.body;

    if (!name || !phone || !issue) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newContact = await Contact.create({
      name,
      phone,
      issue,
    });

    res.status(201).json({
      success: true,
      message: "Your request has been submitted. We will contact you soon.",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not save contact info",
      error: error.message,
    });
  }
};
