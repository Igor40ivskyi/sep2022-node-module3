import { NextFunction, Response } from "express";

class ClientController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
        
    } catch (e) {
      next(e);
    }
  }
}
