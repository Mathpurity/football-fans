import api from "./api";

export const getStats = async () => {
  try {
    const res = await api.get("/stats");
    return res.data;
  } catch (err) {
    console.error("Stats fetch error:", err);
    throw err;
  }
};
