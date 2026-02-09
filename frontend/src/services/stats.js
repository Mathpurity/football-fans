import { apiFetch } from "./api";

export const getStats = () => apiFetch("/api/stats");
