"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const User_model_1 = require("../models/User.model");
const passwordService_1 = require("./passwordService");
class AuthService {
    async register(body) {
        try {
            const { password } = body;
            const hashedPassword = await passwordService_1.passwordService.hash(password);
            await User_model_1.User.create({
                ...body,
                password: hashedPassword,
            });
        }
        catch (e) { }
    }
}
exports.authService = new AuthService();
