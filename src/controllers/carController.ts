import { NextFunction, Request, Response } from "express";

import { EEmailActions } from "../enums";
import { Car } from "../models";
import { emailService } from "../services";
import { ICar, ICommonResponse } from "../types";

class CarController {
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car } = res.locals;

      emailService.sendMail(
        "ihor.sorokivskyi.xt.2017@lpnu.ua",
        EEmailActions.WELCOME
      );

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICar>>> {
    try {
      const body = req.body;
      const car = await Car.create(body);

      return res.status(201).json({
        message: "car created!",
        data: car,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;

      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        { ...req.body },
        { new: true }
      );

      return res.status(201).json(updatedCar);
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
      const { carId } = req.params;
      await Car.deleteOne({ _id: carId });
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
