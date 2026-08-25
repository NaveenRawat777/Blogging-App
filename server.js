import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./src/database/dbconnect.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { blogRoutes } from "./src/routes/blog.routes.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "DowIT API" }),
);
app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use((req, res) =>
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` }),
);
app.use((error, _req, res, _next) => {
  console.error("ERROR:", error.message, error.stack);
  res.status(error.statusCode || 500).json({ error: error.message || "Server error" });
});

dbconnect().then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log(`API listening on ${process.env.PORT || 5000}`),
  ),
);
