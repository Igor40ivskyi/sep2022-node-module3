import Api from "twilio/lib/rest/Api";

import { ApiError } from "../errors";
import { IUser } from "../types";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  data: T[];
}

class UserService {
  getWithPagination(query: any): Promise<IPaginationResponse<IUser>> {
    try {
      return {
        page: 1,
        perPage: 1,
        itemsCount: 1,
        data: [],
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
