import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/apiError";
import { Token } from "../models/Token.model";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("no token", 401);
      }

      const tokenInfo = await Token.findOne();

      if (!tokenInfo) {
        throw new ApiError("token is not valid", 401);
      }

      req.res.locals = { tokenInfo };

      next();
    } catch (e) {
      next(e);
    }
  }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          const refreshToken = req.get("Authorization");

          if (!refreshToken) {
              throw new ApiError("no token", 401);
          }

          await Token.findOne()

          next();
      }catch (e) {
          next(e)
      }
    }
}

export const authMiddleware = new AuthMiddleware();
