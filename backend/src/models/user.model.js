import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    OTP: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    blogs:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Blog",
    },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    membership: { type: String, enum: ["free", "pro", "premium"], default: "free" },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
