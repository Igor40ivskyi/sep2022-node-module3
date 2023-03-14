"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const apiError_1 = require("../errors/apiError");
const User_model_1 = require("../models/User.model");
const validators_1 = require("../validators");
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
    async isValidUserCreate(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new apiError_1.ApiError(error.message, 400);
            }
            req.body = value;
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
