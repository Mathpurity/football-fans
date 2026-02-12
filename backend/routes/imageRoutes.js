import express from "express";
import Image from "../models/Image.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/**
 * CREATE — Admin upload image
 */
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "football-fans" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          stream.end(req.file.buffer);
        });

      const result = await uploadToCloudinary();

      const image = await Image.create({
        title: req.body.title || "",
        description: req.body.description || "",
        imageUrl: result.secure_url,
        isApproved: true, // 🔥 auto approve
      });

      res.status(201).json(image);

    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);

/**
 * PUBLIC — Get approved images
 */
router.get("/", async (req, res) => {
  try {
    const images = await Image.find({ isApproved: true })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

export default router;
