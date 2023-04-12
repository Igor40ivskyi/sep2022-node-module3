import * as http from "node:http";

import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as mongoose from "mongoose";
import { Server } from "socket.io";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter } from "./routers";
import { userRouter } from "./routers";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "http://localhost:63342" } });

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("test:action", (data) => {
    console.log(data);
  });

  socket.emit("test:message", { message: "Hello it is first server emit!" });

  socket.on("send:message", (data) => {
    // socket.broadcast.emit("broadcast:message", data);
    // io.sockets.in(socket.id).emit("new_msg", { msg: "hello" });
  });

  socket.on("join:room1", (roomInfo) => {
    socket.join(roomInfo.roomId);

    io.to(roomInfo.roomId).emit("joined:room", "JOINED ROOM TEST MESSAGE");
  });

  socket.on("leave:room", (roomInfo) => {
    socket.leave(roomInfo.roomId);

    io.to(roomInfo.roomId).emit("left:room", "THIS USER LEFT ROOM!");
  });
});

app.use(express.json());
app.use(fileUploader());
app.use(express.urlencoded({ extended: true }));

app.use("/cars", carRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

//---------- ERROR HANDLER --------------
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`the server has started on port ${configs.PORT}`);
});
