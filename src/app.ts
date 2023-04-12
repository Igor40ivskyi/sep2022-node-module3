import * as http from "node:http";

import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as mongoose from "mongoose";
import { Server, Socket } from "socket.io";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter } from "./routers";
import { userRouter } from "./routers";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  // console.log(socket.id);
  // socket.emit("to:me", { message: "I sent it for myself!" });
  // socket.broadcast.emit("to:all:except", {
  //   message: "i sent it to all except me!",
  // });
  // io.emit("to:all", { message: "i sent it to you all!" });

  socket.on("message", (text) => {
    io.emit("chat:message", { message: `${socket.id} | ${text.message}` });
  });

  socket.on("join:room", (data) => {
    socket.join(data.roomId);

    socket
      .to(data.roomId)
      .emit("user:joined", { message: `user ${socket.id} JOINED the room!` });
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
