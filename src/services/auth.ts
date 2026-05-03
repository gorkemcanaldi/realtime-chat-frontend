import { LoginInput, RegisterInput } from "../types/auth";

export const BASE_URL = "http://localhost:3000";

export const loginUser = async (data: LoginInput) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const registerUser = async (data: RegisterInput) => {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/user/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
};
