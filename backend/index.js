import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import youtubeRoutes from "./routes/youtube.js";
import authRoutes from "./routes/auth.js";
import imageRoutes from "./routes/imageRoutes.js";
import messageRoutes from "./routes/messages.js";
import statsRoutes from "./routes/stats.js";
import seedRoutes from "./routes/seed.js";

dotenv.config();

const app = express();

/* ---------------- CORS CONFIG ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://football-fans-frontend.onrender.com", // replace with your real frontend Render URL
    ],
    credentials: true,
  })
);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/stats", statsRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/seed", seedRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "Football Fans API running 🚀" });
});

/* ---------------- GLOBAL ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

startServer();
