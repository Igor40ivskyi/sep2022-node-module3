import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-tokenEnum";
import { ApiError } from "../errors";
import { Token } from "../models";
import { Action } from "../models/ActionToken.model";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkToken(accessToken);

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) {
        throw new ApiError("Token is not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );

      const tokenInfo = await Token.findOne({ refreshToken });

      if (!tokenInfo) {
        throw new ApiError("Token is not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkActionTokenForgot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actionTokenForgot = req.params.token;

      if (!actionTokenForgot) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkActionToken(
        actionTokenForgot,
        EActionTokenType.forgot
      );

      console.log(jwtPayload);

      const tokenInfo = await Action.findOne({
        actionToken: actionTokenForgot,
      });

      if (!tokenInfo) {
        throw new ApiError("Token is not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
