import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://naveenrawat799_db_user:X1lJTKGTjoEvLfhE@cluster0.jfbyuvg.mongodb.net/blogging?appName=Cluster0";

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

const Blog = mongoose.model("Blog", blogSchema);

async function test() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  try {
    const blog = await Blog.create({
      title: "Test Blog",
      content: "Test content",
      author: "507f1f77bcf86cd799439011",
      slug: "test-blog-" + Math.random().toString(36).slice(2, 8),
      excerpt: "Test content",
      description: "Test content",
      cover: "",
      category: "General",
      tags: [],
      published: true,
      featuring: "null",
    });
    console.log("Blog created:", blog._id);
  } catch (error) {
    console.error("Error creating blog:", error.message, error.stack);
  }

  await mongoose.disconnect();
}

test();
