import api from "./api";

// PUBLIC
export const getImages = async () => {
  const res = await api.get("/api/images");
  return res.data;
};

// ADMIN
export const getAdminImages = async () => {
  const res = await api.get("/api/images/admin");
  return res.data;
};

export const createImage = async (data) => {
  const res = await api.post("/api/images", data);
  return res.data;
};

export const updateImage = async (id, data) => {
  const res = await api.put(`/api/images/${id}`, data);
  return res.data;
};

export const deleteImage = async (id) => {
  const res = await api.delete(`/api/images/${id}`);
  return res.data;
};
