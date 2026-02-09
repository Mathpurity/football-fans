import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
