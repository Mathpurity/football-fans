import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // 🔐 protect with secret
  if (req.headers["x-seed-secret"] !== process.env.SEED_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const exists = await User.findOne({ email: "admin@test.com" });
  if (exists) {
    return res.json({ message: "Admin already exists" });
  }

  await User.create({
    email: "admin@test.com",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
  });

  res.json({ message: "Admin created successfully" });
});

export default router;
