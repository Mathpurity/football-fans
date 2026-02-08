import express from "express";
import Image from "../models/Image.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE (admin only)
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const image = await Image.create({
      title: req.body.title,
      imageUrl: req.file.path,
      isApproved: false,
    });
    res.status(201).json(image);
  }
);
// READ (public: approved only)
router.get("/", async (_req, res) => {
  const images = await Image.find({ isApproved: true }).sort({ createdAt: -1 });
  res.json(images);
});

// READ (admin: all)
router.get("/admin", authMiddleware, async (_req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
});

// UPDATE (admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE (admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  await Image.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
