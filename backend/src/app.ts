import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { authRouter } from "./routers/authRouter";
import { userRouterr } from "./routers/userRouterr";
import { IError } from "./types/commonTypes";
import {Promise} from "mongoose";

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

const connectionDB = async () => {
  let dbCon = false;
  while (!dbCon) {
    try {
      console.log('connecting to database...');
      await mongoose.connect(configs.DB_URL);
      dbCon = true;
    }catch (e) {
      console.log('Database unavailable, wait 3 seconds');
      await new Promise((resolve: () => void) => setTimeout(resolve, 3000));
    }
  }
};

const start = async ()=>{
  try {
    await connectionDB()
    await app.listen(configs.PORT, () => '0.0.0.0');
  console.log(`the server has started on port ${configs.PORT}`);
  }catch (e) {
    console.log(e);
  }
}

start();