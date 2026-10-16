import Users from "../users/user.model.js";
import MatchingService from "./matching.service.js";
import crypto from "node:crypto";

const matchingService = new MatchingService();

class MatchingSocket {
  constructor(io) {
    this.io = io;
    this.online_users = []
  }

  register() {
    this.io.on("connection", (socket) => {

      console.log("your socket ID:", socket.id, "and id user", socket.userId);

      const alreadyExist = this.online_users.some((user) => user.socketId === socket.id)
      if(!alreadyExist){
        this.online_users.push({
          socketId: socket.id
        });
      }
    this.io.emit("users:count", this.online_users.length)

    console.log("[+] new user :",this.online_users)

      socket.on("disconnect", () => {
        this.online_users = this.online_users.filter((user) => user.socketId !== socket.id)
        this.io.emit("users:online", this.online_users)
      })

      socket.on("matching:start", async () => {

        const userA = await Users.findByPk(socket.userId);

        // console.log("hhhheee : =>",userA.userName)

        const matchedUser = await matchingService.startMatching(
          socket.id,
          socket.userId
        );

        console.log("Matched user:", matchedUser)

        console.log("dsfefsf",matchedUser)

        if (matchedUser) {
          const roomId = crypto.randomUUID();

          socket.join(roomId);

          const matched_socket = await this.io.sockets.sockets.get(
            matchedUser.socketId
          );

          matched_socket.join(roomId);

          socket.emit("matching:matched", {
            roomId: roomId,
            socketId: matched_socket.id,
            userId: matched_socket.userId,
            username: matchedUser.username,
            role: "answer-offer"
          });
          matched_socket.emit("matching:matched", {
            roomId: roomId,
            socketId: socket.id,
            userId: socket.userId,
            username: userA.userName,
            role: "send-offer"
          });
          console.log("rooId",roomId)
          console.log("all done")
        }
      });

      socket.on("webrtc:ready", ({roomId}) => {
        if (!roomId || !socket.rooms.has(roomId)) return;
          socket.to(roomId).emit("webrtc:peer-ready", {
          roomId,
          fromSocketId: socket.id,
        });
      })

      socket.on("webrtc:offer", ({roomId, offer}) => {
        if(!socket.rooms.has(roomId) || !offer) return;
        socket.to(roomId).emit("webrtc:offer", {
          offer,
          fromSocketId: socket.id
        })
      })

      socket.on("webrtc:answer", ({roomId, answer}) => {
        if(!socket.rooms.has(roomId) || !answer) return;
        socket.to(roomId).emit("webrtc:answer", {
          answer,
          fromSocketId: socket.id
        })
      })
      
      socket.on("webrtc:ice-candidate", ({roomId, candidate}) => {
        if(!socket.rooms.has(roomId) || !candidate) return;
        socket.to(roomId).emit("webrtc:ice-candidate", {
          candidate,
          fromSocketId: socket.id
        })
      })
    });

  }
}
export default MatchingSocket;
