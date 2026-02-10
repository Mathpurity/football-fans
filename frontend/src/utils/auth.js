import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return jwtDecode(token);
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};
