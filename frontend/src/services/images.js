import api from "./api";

/**
 * PUBLIC — Get approved images
 */
export const getImages = async () => {
  const res = await api.get("/images");
  return res.data;
};

/**
 * ADMIN — Get all images
 */
export const getAdminImages = async () => {
  const res = await api.get("/images/admin");
  return res.data;
};


/**
 * ADMIN — Upload image
 */
export const createImage = async (formData) => {
  const res = await api.post("/images/upload", formData);
  return res.data;
};

/**
 * ADMIN — Update image
 */
export const updateImage = async (id, data) => {
  const res = await api.put(`/images/${id}`, data);
  return res.data;
};

/**
 * ADMIN — Delete image
 */
export const deleteImage = async (id) => {
  await api.delete(`/images/${id}`);
  return true; // cleaner since backend returns 204
};
