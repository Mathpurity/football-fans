import api from "./api";

/* PUBLIC — Send contact message */
export const sendMessage = async (data) => {
  const res = await api.post("/messages", data);
  return res.data;
};

/* ADMIN — Get all messages */
export const getMessages = async () => {
  const res = await api.get("/messages");
  return res.data;
};

/* ADMIN — Delete message */
export const deleteMessage = async (id) => {
  const res = await api.delete(`/messages/${id}`);
  return res.data;
};

/* ADMIN — Mark message as read */
export const markMessageAsRead = async (id) => {
  const res = await api.put(`/messages/${id}/read`);
  return res.data;
};

/* ADMIN — Get unread message count */
export const getUnreadMessageCount = async () => {
  const res = await api.get("/messages/unread-count");
  return res.data;
};