import { logoutUser } from "../services/auth";
import { socket } from "../socket/socket";
import type { NavigateFunction } from "react-router";

export const logout = async (navigate: NavigateFunction) => {
  await logoutUser();
  socket.disconnect();
  localStorage.removeItem("token");
  navigate("/login");
};
