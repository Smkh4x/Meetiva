import MatchingService from "./matching.service.js";
import crypto from "node:crypto";

const matchingService = new MatchingService();

class MatchingSocket {
  constructor(io) {
    this.io = io;
  }

  register() {
    this.io.on("connection", (socket) => {
      // console.log("your socket ID:", socket.userId, socket.id);

      socket.on("matching:start", async () => {
        const matchedUser = await matchingService.startMatching(
          socket.id,
          socket.userId
        );

        if (matchedUser) {
          const roomID = crypto.randomUUID();

          socket.join(roomID);

          const matched_socket = await this.io.sockets.sockets.get(
            matchedUser.socketId
          );

          matched_socket.join(roomID);

          const room = await this.io.sockets.adapter.rooms.get(roomID);

          console.log("room:", [...room]);

          socket.emit("matching:matched", {
            roomId: roomID,
            userId: socket.userId,
          });
          socket.emit("matching:matched", {
            roomId: roomID,
            userID: matchedUser.socketId,
          });
        }
      });
    });
  }
}
export default MatchingSocket;
