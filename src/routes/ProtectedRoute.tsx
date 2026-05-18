import { socket } from "../socket/socket";
import { ReactElement } from "react";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  if (!socket.connected) {
    socket.connect();
  }

  return children;
};
