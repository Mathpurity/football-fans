import express from "express";
import axios from "axios";
import Image from "../models/Image.js";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Count images
    const images = await Image.countDocuments();

    // Count messages
    const messages = await Message.countDocuments();

    // Fetch YouTube videos count
    const youtubeRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId: process.env.YOUTUBE_CHANNEL_ID,
          maxResults: 50, // maximum allowed
          order: "date",
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videos = youtubeRes.data.items.length;

    res.json({
      images,
      videos,
      messages,
    });

  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;