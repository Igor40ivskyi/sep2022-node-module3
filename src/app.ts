import express from "express";
import * as mongoose from "mongoose";

import { userRouter } from "./routers/userRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

const PORT = 5100;

app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
  console.log(`the server has started on port ${PORT}`);
});
