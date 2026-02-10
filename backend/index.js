import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import youtubeRoutes from "./routes/youtube.js";
import authRoutes from "./routes/auth.js";
import imageRoutes from "./routes/images.js";
import messageRoutes from "./routes/messages.js";
import statsRoutes from "./routes/stats.js";
import seedRoutes from "./routes/seed.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stats", statsRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/seed", seedRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

startServer();
