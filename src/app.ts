import * as http from "node:http";

import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as mongoose from "mongoose";
import { Server, Socket } from "socket.io";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter } from "./routers";
import { userRouter } from "./routers";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket: Socket) => {
  console.log(socket.id);

  /** Send to particular client*/
  // socket.emit("message", { message: "HELLO SOCKET" });

  //Send to all clients
  // io.emit("user:connected", { message: "USER CONNECTED" });

  //Send to all except given client
  // socket.broadcast.emit("user:connected", { message: "User connected" });

  socket.on("message:send", (data) => {
    io.emit("message:get", `${socket.id} | ${data}`);
  });

  socket.on("join:room", ({ roomId }) => {
    socket.join(roomId);

    socket
      .to(roomId)
      .emit("user:joined", { socketId: socket.id, action: "Joined" });

    socket.on("left:room", ({ roomId }) => {
      socket.leave(roomId);
      socket
        .to(roomId)
        .emit("user:left", { socketId: socket.id, action: "Left" });
    });
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
