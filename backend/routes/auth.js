import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/reset-admin-password", async (req, res) => {
  const hashed = await bcrypt.hash("Admin123!", 10);

  await User.findOneAndUpdate(
    { email: "admin@test.com" },
    { password: hashed }
  );

  res.json({ message: "Admin password reset" });
});

export default router;
