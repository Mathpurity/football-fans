import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String, // 🔥 needed for Cloudinary delete
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
