import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

// interface IPaginationResponse<T> {
//   page: number;
//   perPage: number;
//   itemsCount: number;
//   itemsFound: number;
//   data: T[];
// }

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string | number;
}

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getWithPagination(query: IQuery) {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (word) => `$${word}`)
      );

      const { page = 1, limit = 3, sortedBy = "name", ...searchObj } = queryObj;

      const skip = +limit * (+page - 1);

      const users = await User.find(searchObj)
        .skip(skip)
        .limit(+limit)
        .sort(sortedBy);

      return {
        page: 1,
        perPage: 1,
        totalItems: 1,
        totalFound: 1,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
