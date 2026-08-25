import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import customError from "../utils/errorClass.js";
import { sendEmail } from "../services/sendmail.js";
import {
  recieveOtpTemplate,
  passwordResetTemplate,
} from "../templates/otptemplate.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "nabu@123";
const otp = () => String(Math.floor(100000 + Math.random() * 900000));
const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  bio: user.bio,
  membership: user.membership,
});

export const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email) throw new customError(400, "email is required");
  const normalizedEmail = email.toLowerCase().trim();
  if (await User.findOne({ email: normalizedEmail }))
    throw new customError(409, "User already exists. Please login.");
  const code = otp();
  await User.create({
    name: name || "New reader",
    email: normalizedEmail,
    password: await bcrypt.hash(password || Math.random().toString(36), 10),
    OTP: code,
  });
  await sendEmail(
    normalizedEmail,
    "DowIT verification code",
    recieveOtpTemplate.replaceAll("123456", code),
  );
  res.status(201).json({ ok: true, message: "OTP sent to email" });
};

export const otpVerifyController = async (req, res) => {
  const { email, otp: code, name, password } = req.body;
  if (!email || !code) throw new customError(400, "email and otp are required");
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) throw new customError(404, "User not found");
  if (user.OTP !== String(code)) throw new customError(400, "Wrong OTP");
  user.OTP = null;
  user.isVerified = true;
  if (name) user.name = name;
  if (password) user.password = await bcrypt.hash(password, 10);
  await user.save();
  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    secret(),
    { expiresIn: "7d" },
  );
  res.json({ token, user: publicUser(user) });
};

export const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new customError(400, "email and password are required");

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new customError(401, "Invalid email or password");

  if (!user.isVerified)
    throw new customError(403, "Verify your email before logging in");

  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("jwtToken", token, { httpOnly: true, sameSite: "lax" });
  res.json({ token, user: publicUser(user) });
};

export const forgetPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new customError(400, "email is required");
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.json({ ok: true });
  const code = otp();
  user.OTP = code;
  await user.save();
  await sendEmail(
    user.email,
    "DowIT password reset code",
    passwordResetTemplate.replaceAll("123456", code),
  );
  res.json({ ok: true, message: "OTP sent to email" });
};

export const passwordResetOtpController = async (req, res) => {
  const { email, otp: code } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase().trim() });
  if (!user || user.OTP !== String(code))
    throw new customError(400, "Wrong OTP");
  user.OTP = null;
  await user.save();
  const resetToken = jwt.sign(
    { sub: user._id.toString(), scope: "password-reset" },
    secret(),
    { expiresIn: "15m" },
  );
  res.json({ ok: true, resetToken });
};

export const passwordResetController = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  if (!resetToken || !newPassword)
    throw new customError(400, "resetToken and newPassword are required");
  let payload;
  try {
    payload = jwt.verify(resetToken, secret());
  } catch {
    throw new customError(400, "Invalid or expired reset token");
  }
  if (payload.scope !== "password-reset")
    throw new customError(400, "Invalid reset token");
  const user = await User.findById(payload.sub);
  if (!user) throw new customError(404, "User not found");
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true });
};

export const getMeController = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -OTP");
  if (!user) throw new customError(404, "User not found");
  res.json(user);
};

export const updateMeController = async (req, res) => {
  const allowed = ["name", "avatar", "bio"];
  const patch = Object.fromEntries(
    allowed.filter((key) => key in req.body).map((key) => [key, req.body[key]]),
  );
  const user = await User.findByIdAndUpdate(req.user.id, patch, {
    new: true,
    runValidators: true,
  }).select("-password -OTP");
  res.json(user);
};

export const updateMembershipController = async (req, res) => {
  if (!["free", "pro", "premium"].includes(req.body.plan))
    throw new customError(400, "Invalid plan");
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { membership: req.body.plan },
    { new: true },
  ).select("-password -OTP");
  res.json(user);
};

export const getUserDataController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new customError(400, "User ID is required");

  const existingUser = await User.FindOne({_id:userId});

  if (!existingUser) throw new customError(404, "User not found");

  res.status(200).json({
    status: "Success",
    message: "User Data Fetched Successfully",
    data: {
      name: existingUser.name,
      email: existingUser.email,
    },
  });
};
