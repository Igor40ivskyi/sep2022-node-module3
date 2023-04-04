import { ApiError } from "../errors";
import { Car } from "../models";
import { ICar } from "../types";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;
  data: T[];
}

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string | number;
}

class CarService {
  public async getAll(): Promise<ICar[]> {
    try {
      return Car.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();
