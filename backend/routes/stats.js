import express from "express";
import Image from "../models/Image.js";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const [images, messages] = await Promise.all([
      Image.countDocuments(),
      Message.countDocuments(),
    ]);

    res.json({
      images: images || 0,
      messages: messages || 0,
      videos: 0, // always return a number
    });

  } catch (err) {
    console.error("Stats route error:", err);
    res.status(500).json({
      images: 0,
      messages: 0,
      videos: 0,
    });
  }
});

export default router;
