import express from "express";
import Message from "../models/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC — Send Message */
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
      read: false,
    });

    res.status(201).json(newMessage);

  } catch (error) {
    console.error("Message create error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

/* ADMIN — Get All Messages */
router.get("/", authMiddleware, async (req, res) => {
  try {

    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.json(messages);

  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

/* ADMIN — Get Unread Count */
router.get("/unread-count", authMiddleware, async (req, res) => {
  try {

    const count = await Message.countDocuments({ read: false });

    res.json({ count });

  } catch (error) {
    console.error("Unread count error:", error);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
});

/* ADMIN — Mark Message as Read */
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(message);

  } catch (error) {
    console.error("Mark read error:", error);
    res.status(500).json({ message: "Failed to mark message as read" });
  }
});

/* ADMIN — Delete Message */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Message.findByIdAndDelete(req.params.id);

    res.json({ message: "Message deleted" });

  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

export default router;