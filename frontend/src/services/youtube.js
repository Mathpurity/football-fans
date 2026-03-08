import api from "./api";

/**
 * PUBLIC — Fetch latest videos
 */
export const fetchVideos = async () => {
  const res = await api.get("/youtube/videos");
  return res.data;
};