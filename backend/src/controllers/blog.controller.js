import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import customError from "../utils/errorClass.js";

const slugify = (value) =>
  `${
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "story"
  }-${Math.random().toString(36).slice(2, 8)}`;

const normalizeTags = (value) =>
  Array.isArray(value)
    ? value
    : String(value || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

const buildBlogPayload = (body) => {
  const title = body.title?.trim();
  const rawContent = body.content?.trim();
  const rawExcerpt = body.excerpt?.trim() || body.description?.trim();
  const excerpt = rawExcerpt || rawContent?.slice(0, 160) || "";

  return {
    title,
    excerpt,
    description: excerpt,
    content: rawContent,
    cover: body.cover?.trim() || "",
    category: body.category || "General",
    tags: normalizeTags(body.tags),
    published: body.published ?? true,
    featuring: body.featuring || "null",
  };
};

export const listBlogs = async (req, res) => {
  const { category, q, mine } = req.query;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 12);
  const filter = {};

  if (mine === "true") {
    if (!req.user) throw new customError(401, "Unauthorized");
    filter.author = req.user.id;
  } else {
    filter.published = true;
  }

  if (category && category !== "All") filter.category = category;
  if (q) {
    const regex = new RegExp(q, "i");
    filter.$or = [{ title: regex }, { excerpt: regex }, { content: regex }];
  }

  const [items, total] = await Promise.all([
    Blog.find(filter)
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Blog.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
};

export const getBlog = async (req, res) => {
  const query = { slug: req.params.slug };
  if (mongoose.Types.ObjectId.isValid(req.params.slug)) {
    query.$or = [{ slug: req.params.slug }, { _id: req.params.slug }];
  }
  const blog = await Blog.findOne(query).populate(
    "author",
    "name email avatar",
  );

  if (!blog) throw new customError(404, "Not found");
  res.json(blog);
};

export const createBlog = async (req, res, next) => {
  try {
    console.log("createBlog called, req.user:", req.user);
    const payload = buildBlogPayload(req.body);
    if (!payload.title || !payload.content) {
      throw new customError(400, "Title and content are required");
    }
    console.log("payload:", payload);
    const blog = await Blog.create({
      ...payload,
      author: req.user?.id,
      slug: slugify(payload.title),
    });
    console.log("blog created:", blog._id);
    res.status(201).json(blog);
  } catch (error) {
    console.error("createBlog error:", error.message, error.stack);
    throw error;
  }
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new customError(404, "Not found");
  if (blog.author.toString() !== req.user.id)
    throw new customError(403, "Forbidden");

  const payload = buildBlogPayload(req.body);
  const patch = {};

  if ("title" in req.body) patch.title = payload.title;
  if ("content" in req.body) patch.content = payload.content;
  if (
    "excerpt" in req.body ||
    "description" in req.body ||
    "content" in req.body
  ) {
    patch.excerpt = payload.excerpt;
    patch.description = payload.description;
  }
  if ("cover" in req.body) patch.cover = payload.cover;
  if ("category" in req.body) patch.category = payload.category;
  if ("tags" in req.body) patch.tags = payload.tags;
  if ("published" in req.body) patch.published = payload.published;
  if ("featuring" in req.body) patch.featuring = payload.featuring;
  if (patch.title) patch.slug = slugify(patch.title);

  const updated = await Blog.findByIdAndUpdate(req.params.id, patch, {
    new: true,
    runValidators: true,
  }).populate("author", "name email avatar");

  res.json(updated);
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new customError(404, "Not found");
  if (blog.author.toString() !== req.user.id)
    throw new customError(403, "Forbidden");

  await blog.deleteOne();
  res.json({ ok: true });
};

export const likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new customError(404, "Not found");

  blog.likes += 1;
  await blog.save();
  res.json({ likes: blog.likes });
};

export const imageUploadController = async (req, res) => {
  if(!req.file) throw new customError(400, "No file recieved");
  // console.log(req.file.path);
  res.status(200).json({status:"success", message:"Image uploaded successfully", path: req.file.path });
};
