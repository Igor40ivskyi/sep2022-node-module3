import { NextFunction, Request, Response } from "express";

import { EEmailActions } from "../enums";
import { User } from "../models";
import { emailService } from "../services";
import { ICommonResponse, IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await User.find();

      emailService.sendMail(
        "ihor.sorokivskyi.xt.2017@lpnu.ua",
        EEmailActions.GETALL
      );

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      emailService.sendMail(
        "ihor.sorokivskyi.xt.2017@lpnu.ua",
        EEmailActions.WELCOME
      );

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const body = req.body;
      const user = await User.create(body);

      return res.status(201).json({
        message: "user created!",
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...req.body },
        { new: true }
      );

      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
