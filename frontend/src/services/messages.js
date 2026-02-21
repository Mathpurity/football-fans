import api from "./api";

// PUBLIC — send message
export const sendMessage = async (data) => {
  const res = await api.post("/messages", data);
  return res.data;
};

// ADMIN — get all messages
export const getMessages = async () => {
  const res = await api.get("/messages");
  return res.data;
};

// ADMIN — delete message
export const deleteMessage = async (id) => {
  const res = await api.delete(`/messages/${id}`);
  return res.data;
};
