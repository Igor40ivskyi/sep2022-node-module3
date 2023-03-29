import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  data: T[];
}

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getWithPagination(
    query: any
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = query;

      console.log(page, "PAGE");

      const skip = limit * (page - 1);

      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy);
      const userstotalCount = await User.count();

      return {
        page: +page,
        itemsCount: userstotalCount,
        perPage: +limit,
        //@ts-ignore
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
