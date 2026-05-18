import { io } from "socket.io-client";
import { BASE_URL } from "../services/auth";

export const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});
