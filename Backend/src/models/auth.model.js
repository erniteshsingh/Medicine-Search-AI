import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String
  },

  googleId: {
    type: String
  },

  avatar: {
    type: String
  }

},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);