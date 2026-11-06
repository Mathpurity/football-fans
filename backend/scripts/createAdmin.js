import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function updateAdmin() {
  try {
    const newEmail = process.env.NEW_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    const newPassword = process.env.NEW_ADMIN_PASSWORD;

    if (!newEmail || !newPassword) {
      throw new Error("New admin email and password are required.");
    }

    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Find existing test administrator
    const admin = await User.findOne({
      email: "admin@test.com",
      role: "admin"
    });

    if (!admin) {
      throw new Error(
        "Test admin not found. Check the users collection in MongoDB."
      );
    }

    // Prevent duplicate email addresses
    const existingUser = await User.findOne({
      email: newEmail,
      _id: { $ne: admin._id }
    });

    if (existingUser) {
      throw new Error("This email is already registered.");
    }

    // Update email and hash the new password
    admin.email = newEmail;

    admin.password = await bcrypt.hash(
      newPassword,
      12
    );

    admin.role = "admin";

    await admin.save();

    console.log("Admin credentials updated successfully!");
    console.log("New admin email:", admin.email);

  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
}

updateAdmin();