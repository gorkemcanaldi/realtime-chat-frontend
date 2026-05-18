export type Message = {
  _id: string;
  message: string;
  username: string;
  userId: string;
};

export type RoomUser = {
  socketId: string;
  userId: string;
  username: string;
};
