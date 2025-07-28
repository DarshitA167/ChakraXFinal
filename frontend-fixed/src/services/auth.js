import axios from "axios";

// Proxy is already set in package.json → "/api" automatically forwards to Django

export const registerUser = (username, email, password) =>
  axios.post("/api/auth/signup/", { username, email, password });

export const loginUser = (username, password) =>
  axios.post("/api/auth/login/", { username, password });

export const getProfile = (token) =>
  axios.get("/api/auth/profile/", {
    headers: { Authorization: `Bearer ${token}` },
  });
