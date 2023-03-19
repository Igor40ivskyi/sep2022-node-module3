import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/apiError";
import { User } from "../models/User.model";
import { IRequest } from "../types/commonTypes";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("user is not found", 422);
      }
      res.locals = { user };
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });
        if (user) {
          throw new ApiError(
            `User with ${fieldName} ${fieldValue} already exsists `,
            409
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });
        if (!user) {
          throw new ApiError(`User not found `, 422);
        }

        req.res.locals = { user };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  //Validators
  public async isValidUserCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("ID is not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.loginUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
