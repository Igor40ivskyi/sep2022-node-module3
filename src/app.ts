import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { authRouter } from "./routers/authRouter";
import { userRouterr } from "./routers/userRouterr";
import { IError } from "./types/commonTypes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouterr);
app.use("/auth", authRouter);

//---------- ERROR HANDLER --------------
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`the server has started on port ${configs.PORT}`);
});
