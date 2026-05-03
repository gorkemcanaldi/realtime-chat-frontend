import { useState } from "react";
import { useNavigate } from "react-router";

function Room() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[600px] h-[400px] rounded-lg bg-purple-100/90 flex flex-col gap-6 items-center space-y-4 p-2">
        <h1 className="text-center my-10 font-bold text-2xl ">
          WELCOME THE CHAT ROOM
        </h1>

        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border-none w-3/4 rounded-xl outline-none p-3 bg-white"
          type="text"
          placeholder="Room"
          onKeyDown={(e) => {
            if (e.key === "Enter" && roomId.trim()) {
              navigate(`/chat?roomId=${roomId}`);
            }
          }}
        />
        <div
          onClick={() => {
            if (!roomId.trim()) return;
            navigate(`/chat?roomId=${roomId}`);
          }}
          className="tracking-wider hover:opacity-70 cursor-pointer w-3/4 h-12 pt-2 text-xl text-center rounded-xl text-white bg-indigo-900"
        >
          CHAT
        </div>
        <button
          className="tracking-wider 
                   hover:bg-indigo-900 
                   hover:text-white 
                   text-indigo-900 
                   cursor-pointer 
                   w-1/4 h-10  
                   text-xl text-center 
                   rounded-xl 
                   border border-indigo-900"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Room;
