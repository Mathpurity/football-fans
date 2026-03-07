// Save token
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// Get token
export function getToken() {
  return localStorage.getItem("token");
}

// Remove token
export function clearToken() {
  localStorage.removeItem("token");
}

// Check if admin is logged in
export function isAdmin() {
  const token = getToken();
  return !!token;
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}