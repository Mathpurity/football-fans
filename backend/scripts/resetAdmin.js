import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import User from "../models/user.js";

dotenv.config();

async function resetAdmin() {
  try {
    const email = process.env.NEW_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    const password = process.env.NEW_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "NEW_ADMIN_EMAIL and NEW_ADMIN_PASSWORD are required"
      );
    }

    if (password.length < 12) {
      throw new Error(
        "Password must contain at least 12 characters"
      );
    }

    // Use the existing backend database connection
    await connectDB();

    // Find existing administrators
    const admins = await User.find({
      role: "admin"
    });

    if (admins.length !== 1) {
      throw new Error(
        `Expected exactly one admin, found ${admins.length}. No changes made.`
      );
    }

    const admin = admins[0];

    // Prevent duplicate email addresses
    const existingUser = await User.findOne({
      email,
      _id: { $ne: admin._id }
    });

    if (existingUser) {
      throw new Error(
        "New email is already assigned to another account"
      );
    }

    // Securely hash the new password
    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // Update the existing administrator
    await User.updateOne(
      {
        _id: admin._id,
        role: "admin"
      },
      {
        $set: {
          email,
          password: hashedPassword
        }
      }
    );

    console.log("Admin credentials reset successfully!");

  } catch (error) {
    console.error("Admin reset failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
}

resetAdmin();