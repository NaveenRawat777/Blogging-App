import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    excerpt: { type: String, default: "" },
    description: { type: String, default: "" },
    content: { type: String, required: true },
    cover: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Technology", "Science", "Trading", "Psychology", "General"],
      default: "General",
    },
    tags: [{ type: String, trim: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    published: { type: Boolean, default: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    featuring: { type: String, default: "null" },
  },
  { timestamps: true },
);

blogSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);

    this.slug = `${baseSlug || "story"}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  }
});

export const Blog = mongoose.model("Blog", blogSchema);
