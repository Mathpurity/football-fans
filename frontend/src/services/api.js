import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ THIS WAS MISSING
export async function apiFetch(method, url, data) {
  const res = await api({
    method,
    url,
    data,
  });
  return res.data;
}

export default api;
