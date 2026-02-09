import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const admin = await User.create({
  email: "admin@test.com",
  password: await bcrypt.hash("admin123", 10),
  role: "admin",
});

console.log("Admin created:", admin.email);
process.exit();
