import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  banned: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
