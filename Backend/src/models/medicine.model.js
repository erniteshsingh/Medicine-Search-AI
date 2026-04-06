import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    query: {
      type: String,
      required: true,
    },

    response: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Medicine", medicineSchema);
