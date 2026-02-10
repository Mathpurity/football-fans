import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/admin", async (req, res) => {
  const { key } = req.query;

  if (key !== process.env.SEED_ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const exists = await User.findOne({ role: "admin" });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const admin = await User.create({
    email: process.env.ADMIN_EMAIL,
    password: hashed,
    role: "admin",
  });

  res.json({
    message: "Admin created successfully",
    email: admin.email,
  });
});

export default router;
