import * as jwt from "jsonwebtoken";

import { tokenConstants } from "../constants/tokenConstants";
import { ITokenPair, ITokenPayload } from "../types";
import { ApiError } from "../errors/apiError";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, tokenConstants.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, tokenConstants.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  public checkToken(token, tokenType = "") {
    try {
      
    }catch (e) {
      throw new ApiError("token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
