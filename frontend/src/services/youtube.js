import api from "./api";

/**
 * PUBLIC — Get approved videos
 */
export const getVideos = async () => {
  const res = await api.get("/youtube/videos");
  return res.data;
};

/**
 * ADMIN — Get all videos
 */
export const getAdminVideos = async () => {
  const res = await api.get("/youtube/admin");
  return res.data;
};

/**
 * ADMIN — Create video
 */
export const createVideo = async (data) => {
  const res = await api.post("/youtube", data);
  return res.data;
};

/**
 * ADMIN — Update video
 */
export const updateVideo = async (id, data) => {
  const res = await api.put(`/youtube/${id}`, data);
  return res.data;
};

/**
 * ADMIN — Delete video
 */
export const deleteVideo = async (id) => {
  await api.delete(`/youtube/${id}`);
  return true;
};