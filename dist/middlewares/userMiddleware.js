"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const apiError_1 = require("../errors/apiError");
const User_model_1 = require("../models/User.model");
class UserMiddleware {
    async getByIdThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_model_1.User.findById(userId);
            if (!user) {
                throw new apiError_1.ApiError("user not found", 404);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
