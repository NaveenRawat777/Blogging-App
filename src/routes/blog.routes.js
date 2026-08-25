import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  authMiddleware,
  optionalAuthMiddleware,
} from "../middlewares/authentication.middleware.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  likeBlog,
  listBlogs,
  updateBlog,
  imageUploadController,
} from "../controllers/blog.controller.js";
import upload from "../services/multerStorage.js";

export const blogRoutes = express.Router();

blogRoutes.get("/", optionalAuthMiddleware, asyncHandler(listBlogs));
blogRoutes.get("/:slug", asyncHandler(getBlog));
blogRoutes.post("/", authMiddleware, asyncHandler(createBlog));
blogRoutes.post(
  "/post",
  (req, res, next) => {
    console.log("DEBUG /post route hit", req.method, req.path, req.body);
    next();
  },
  authMiddleware,
  asyncHandler(createBlog),
);
blogRoutes.put("/:id", authMiddleware, asyncHandler(updateBlog));
blogRoutes.delete("/:id", authMiddleware, asyncHandler(deleteBlog));
blogRoutes.post("/:id/like", authMiddleware, asyncHandler(likeBlog));

blogRoutes.post("/upload", authMiddleware, upload.single("image"), asyncHandler(imageUploadController)) 
