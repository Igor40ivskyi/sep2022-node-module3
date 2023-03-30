import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string;
}

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;
  data: T[];
}

class UserService {
  public async getWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );
      const {
        page = 1,
        limit = 4,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy)
        .lean();

      const usersTotalCount = await User.count();

      return {
        page: +page,
        itemsCount: usersTotalCount,
        perPage: +limit,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
