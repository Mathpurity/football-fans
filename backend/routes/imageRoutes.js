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

      // Upload buffer to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "football-fans" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      const image = await Image.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: result.secure_url,
        isApproved: false,
      });

      res.status(201).json(image);
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);

/**
 * PUBLIC — Get approved images
 */
router.get("/", async (_req, res) => {
  try {
    const images = await Image.find({ isApproved: true })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

/**
 * ADMIN — Get all images
 */
router.get("/admin", authMiddleware, async (_req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

/**
 * UPDATE — Approve / edit
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update image" });
  }
});

/**
 * DELETE — Remove image
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Image.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete image" });
  }
});

export default router;
