import { NextFunction, Request, Response } from "express";

import { User } from "../models/User.model";

class UserMiddleware {
  public async getByIdThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("user not found");
      }

      next();
    } catch (e) {
      console.log(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
