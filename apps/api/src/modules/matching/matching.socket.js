import MatchingService from "./matching.service.js";
import crypto from "node:crypto";

const matchingService = new MatchingService();

class MatchingSocket {
  constructor(io) {
    this.io = io;
  }

  register() {
    this.io.on("connection", (socket) => {
      console.log("your socket ID:", socket.id, "and id user", socket.userId);

      socket.on("matching:start", async () => {

        const matchedUser = await matchingService.startMatching(
          socket.id,
          socket.userId
        );

        console.log("Matched user:", matchedUser)

        console.log("dsfefsf",matchedUser)

        if (matchedUser) {
          const roomID = crypto.randomUUID();

          socket.join(roomID);

          const matched_socket = await this.io.sockets.sockets.get(
            matchedUser.socketId
          );

          matched_socket.join(roomID);

        // console.log("Room:", roomID);
        // console.log("User A:", {
        //   socketId: socket.id,
        //   userId: socket.userId,
        //   username: socket.username,
        // });

        // console.log("User B:", {
        //   socketId: matched_socket.id,
        //   userId: matched_socket.userId,
        //   username: matchedUser.username,
        // });

          socket.emit("matching:matched", {
            roomId: roomID,
            socketId: matched_socket.userId,
            userId: matched_socket.userId,
            username: matchedUser.username
          });
          matched_socket.emit("matching:matched", {
            roomId: roomID,
            socketID: socket.socketId,
            userId: socket.userId,
            username: socket.username
          });

          console.log("all done")
        }
      });
    });
  }
}
export default MatchingSocket;
