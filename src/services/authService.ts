import { User } from "../models/User.model";
import { IUser } from "../types/user.types";
import { passwordService } from "./passwordService";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {}
  }
}

export const authService = new AuthService();
