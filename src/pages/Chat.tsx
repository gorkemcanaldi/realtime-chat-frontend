import { socket } from "../socket/socket";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { logout } from "../components/Logout";
import { RoomUser, Message } from "../types/socket";
function Chat() {
  const [params] = useSearchParams();
  const roomId = params.get("roomId");
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!roomId) return;

    const handleRoomMessage = (e: Message[]) => setMessages(e);
    const handleReceive = (m: Message) => setMessages((p) => [...p, m]);
    const handleUsers = (users: RoomUser[]) => setUsers(users);
    socket.emit("join_room", roomId);

    socket.on("room_message", handleRoomMessage);

    socket.on("room_users", handleUsers);

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("room_message", handleRoomMessage);
      socket.off("receive_message", handleReceive);
      socket.off("room_users", handleUsers);
    };
  }, [roomId]);
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" />;
  }

  const myUserId = JSON.parse(user).id;

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      roomId,
      message,
    });
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full h-[600px] bg-white ">
        <div className="w-full h-16 bg-gray-700 flex items-center p-2 flex justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-2xl text-white"
              onClick={() => navigate("/room")}
            >
              {"<"}
            </span>
            <div className="w-12 h-12 bg-white rounded-full text-red justify-center font-bold flex items-center"></div>
          </div>{" "}
          <span>
            {users.map((u) => (
              <span
                key={u.socketId}
                className="text-sm bg-white ml-1 px-2 rounded"
              >
                {u.username}
              </span>
            ))}
          </span>
          <button
            className="tracking-wider hover:opacity-70 cursor-pointer w-1/4 h-8 mt-2  text-m text-center rounded-xl text-white bg-indigo-900"
            onClick={() => logout(navigate)}
          >
            Log out
          </button>
        </div>
        <div className="w-full h-[490px] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`${myUserId === msg.userId ? "flex justify-end" : ""}`}
            >
              <div
                className={`${myUserId === msg.userId ? "bg-green-600 rounded-br-none" : "bg-blue-600 rounded-bl-none"} w-1/2 text-white text-sm m-2  rounded-xl p-2`}
              >
                <div>{msg.message}</div>
                <div className="w-full flex justify-end text-xs text-black">
                  {msg.username}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full flex border-t bg-white">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 h-12 border p-3 outline-none"
            type="text"
            placeholder="message send"
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
