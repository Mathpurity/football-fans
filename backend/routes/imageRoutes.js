import express from "express";
import Image from "../models/Image.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/**
 * ==============================
 * CREATE — Admin upload image
 * ==============================
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

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "football-fans",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      const image = await Image.create({
        title: req.body.title || "",
        description: req.body.description || "",
        imageUrl: result.secure_url,
        publicId: result.public_id, // 🔥 important for delete
        isApproved: true,
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
 * ==============================
 * PUBLIC — Get approved images
 * ==============================
 */
router.get("/", async (_req, res) => {
  try {
    const images = await Image.find({ isApproved: true })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (error) {
    console.error("Fetch approved error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

/**
 * ==============================
 * ADMIN — Get ALL images
 * ==============================
 */
router.get("/admin", authMiddleware, async (_req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Fetch admin error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

/**
 * ==============================
 * DELETE — Remove image
 * ==============================
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 🔥 Delete from Cloudinary
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // 🔥 Delete from database
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
});

export default router;
