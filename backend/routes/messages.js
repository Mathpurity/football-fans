import express from "express";
import Message from "../models/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * PUBLIC — Send message
 */
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const saved = await Message.create({ name, email, message });
  res.status(201).json(saved);
});

/**
 * ADMIN — Get all messages
 */
router.get("/", authMiddleware, async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

/**
 * ADMIN — Delete message
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
