import genAI from "../config/ai.config.js";

const COMMON_FORMATTING = `
[STRICT FORMATTING]
- NO Markdown symbols (No *, #, **, or \`). 
- Use ALL CAPS for section headings.
- Use double dashes (--) for all bullet points.
- Output MUST be plain text only.

[RESPONSE TEMPLATE]
OFFICIAL IDENTIFICATION
-- Brand Name: [Corrected Name]
-- Generic Salt: [Composition]
-- Pharmacological Class: [e.g., NSAID, Beta-Blocker]

I. THERAPEUTIC INDICATIONS (USES)
-- Primary: [Main Condition]
-- Secondary: [Off-label or secondary use]

II. CLINICAL PHARMACOLOGY
-- Mechanism of Action: [How it works in the body]
-- Onset of Action: [Estimated time to effect]

III. DOSAGE & ADMINISTRATION
-- Standard Route: [e.g., Oral]
-- Interaction with Food: [Empty stomach/With food]
-- DOSE WARNING: Dosage is strictly patient-specific. Refer to prescription.

IV. SAFETY & ADVERSE REACTIONS
-- Common: [Top 3 side effects]
-- Severe (ER Alert): [Emergency symptoms]
-- High-Risk Warning: [If any, otherwise 'None']

V. LIFESTYLE & CONTRAINDICATIONS
-- Alcohol: [Specific interaction detail]
-- Pregnancy: [Safety category/Advice]
-- Driving: [Impact on motor skills]

=========================================
[VITAL DISCLAIMER]
This AI-generated analysis is for informational use only. It is NOT medical advice. Automated systems can make errors. Always consult a Board-Certified Physician before use.
`;

const SHARED_CONFIG = {
  temperature: 0.0,
  maxOutputTokens: 1800,
  topP: 1,
  topK: 1,
};

export const analyzeMedicineText = async (text) => {
  try {
    const query = text?.trim();
    if (!query || query.length < 3) throw new Error("Query too short.");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      generationConfig: SHARED_CONFIG,
    });

    const prompt = `Analyze the medicine: "${query}". Provide details like uses, side effects, and precautions. ${COMMON_FORMATTING}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const plainText = response.text();

    if (!plainText) throw new Error("NO_DATA_RETURNED");

    return plainText.replace(/[*#`]/g, "").trim();
  } catch (error) {
    console.error("AI Text Service Error:", error.message);
    throw error;
  }
};

export const analyzeMedicineImage = async (
  imageBase64,
  mimeType = "image/jpeg",
) => {
  try {
    if (!imageBase64) throw new Error("No image data received.");

    // Base64 string se header remove karna agar मौजूद hai
    const cleanBase64 = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: SHARED_CONFIG,
    });

    const prompt = `Analyze this medicine image and provide a report. ${COMMON_FORMATTING}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const plainText = response.text();

    if (!plainText) throw new Error("NO_DATA_RETURNED");

    return plainText.replace(/[*#`]/g, "").trim();
  } catch (error) {
    console.error("AI Vision Service Error:", error.message);
    throw new Error("Vision Intelligence failed. Check if image is valid.");
  }
};
