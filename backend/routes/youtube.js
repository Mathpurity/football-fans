import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/videos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId: process.env.YOUTUBE_CHANNEL_ID,
          maxResults: 9,
          order: "date",
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

export default router;
