import express from "express";
import Image from "../models/Image.js";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const [images, messages] = await Promise.all([
    Image.countDocuments(),
    Message.countDocuments(),
  ]);

  res.json({
    images,
    messages,
    videos: "Auto (YouTube)",
  });
});

export default router;
