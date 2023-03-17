"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const apiError_1 = require("../errors/apiError");
const User_model_1 = require("../models/User.model");
const passwordService_1 = require("./passwordService");
const tokenService_1 = require("./tokenService");
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
        catch (e) {
            throw new apiError_1.ApiError(e.message, e.status);
        }
    }
    async login(credentials, user) {
        try {
            const isMatched = await passwordService_1.passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new apiError_1.ApiError("Invalid email or password", 400);
            }
            const tokenPair = tokenService_1.tokenService.generateTokenPair({
                name: user.name,
                id: user._id,
            });
            return tokenPair;
        }
        catch (e) {
            throw new apiError_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
