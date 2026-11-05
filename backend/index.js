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

const allowedOrigins = [
  "https://footballfansfellowship.com",
  "https://www.footballfansfellowship.com",
  "http://footballfansfellowship.com",
  "http://www.footballfansfellowship.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://football-fans-kohl.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

/* ---------------- SERVER CONFIG ---------------- */

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

startServer();