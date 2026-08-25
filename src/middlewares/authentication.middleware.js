import jwt from "jsonwebtoken";
import customError from "../utils/errorClass.js";

export const authMiddleware = (req, _res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : req.cookies?.jwtToken;

    if (!token) {
      throw new customError(401, "Token Not Found");
    }

    // jwt token
    const isVerified = jwt.verify(token, process.env.JWT_SECRET || "nabu@123");

    if (!isVerified) {
      throw new customError(401, "Invalid Token");
    }

    req.user = { id: isVerified.sub, email: isVerified.email };
    console.log("authMiddleware: authenticated user", req.user.id);
    next();
  } catch (error) {
    console.error("authMiddleware error:", error.message);
    const err = error.statusCode
      ? error
      : new customError(401, "Invalid or expired token");
    next(err);
  }
};

export const optionalAuthMiddleware = (req, _res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;

  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "nabu@123");
    req.user = { id: payload.sub, email: payload.email };
  } catch {
    // Public request; ignore invalid token.
  }

  next();
};
