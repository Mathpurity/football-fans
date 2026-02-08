import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
