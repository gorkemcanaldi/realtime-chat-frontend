import Room from "../pages/Room";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";
import { ProtectedRoute } from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/room"
        element={
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
