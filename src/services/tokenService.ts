import * as jwt from "jsonwebtoken";

import { tokenConstants } from "../constants/tokenConstants";
import { ITokenPair, ITokenPayload } from "../types";

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
  public checkToken (token)
}

export const tokenService = new TokenService();
