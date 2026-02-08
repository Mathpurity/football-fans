import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    youtubeId: String,
    title: String,
    description: String,
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
