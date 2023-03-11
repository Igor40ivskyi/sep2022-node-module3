import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { User } from "./models/User.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", (req: Request, res: Response) => {
  res.json("WELCOMEeeeeeeeeeeee");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const body = req.body;
  console.log("TTTTEEEEEEESTTTTTTT");
  const user = await User.create(body);

  res.status(201).json({
    message: "user created!",
    data: user,
  });
});

const PORT = 5300;

app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
  console.log(`the server has started on port ${PORT}`);
});
