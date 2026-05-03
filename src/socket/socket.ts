import { io } from "socket.io-client";
import { BASE_URL } from "../services/auth";
const token = localStorage.getItem("token");

export const socket = io(BASE_URL, {
  auth: {
    token,
  },
});
