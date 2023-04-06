import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter } from "./routers";
import { userRouter } from "./routers";

const app = express();

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

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`the server has started on port ${configs.PORT}`);
});
