import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  userRegisterController,
  otpVerifyController,
  userLoginController,
  forgetPasswordController,
  passwordResetOtpController,
  passwordResetController,
  getMeController,
  updateMeController,
  updateMembershipController,
  getUserDataController,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authentication.middleware.js";

export const userRoutes = express.Router();

userRoutes.post("/register", asyncHandler(userRegisterController));
userRoutes.post("/verify-otp", asyncHandler(otpVerifyController));
userRoutes.post("/login", asyncHandler(userLoginController));
userRoutes.post("/forget-password", asyncHandler(forgetPasswordController));
userRoutes.post(
  "/password-reset-verification",
  asyncHandler(passwordResetOtpController),
);
userRoutes.post("/password-reset", asyncHandler(passwordResetController));

// Compatibility aliases used by the React authentication screens.
userRoutes.post("/signup/send-otp", asyncHandler(userRegisterController));
userRoutes.post(
  "/signup/verify",
  (req, _res, next) => {
    req.body.otp = req.body.code;
    next();
  },
  asyncHandler(otpVerifyController),
);
userRoutes.post("/forgot/send-otp", asyncHandler(forgetPasswordController));
userRoutes.post(
  "/forgot/verify",
  (req, _res, next) => {
    req.body.otp = req.body.code;
    next();
  },
  asyncHandler(passwordResetOtpController),
);
userRoutes.post("/forgot/reset", asyncHandler(passwordResetController));
userRoutes.get("/me", authMiddleware, asyncHandler(getMeController));
userRoutes.put("/me", authMiddleware, asyncHandler(updateMeController));
userRoutes.put(
  "/me/membership",
  authMiddleware,
  asyncHandler(updateMembershipController),
);

userRoutes.get("/data/:userId", asyncHandler(getUserDataController));

// userRoutes.get("/test-route", async (req, res) => {
//   res.send("hello and welcome");
// });

