"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const mongoose_1 = require("mongoose");
const apiError_1 = require("../errors/apiError");
const User_model_1 = require("../models/User.model");
const userValidator_1 = require("../validators/userValidator");
class UserMiddleware {
    async getByIdOrThrow(req, res, next) {
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
    async createUserValidator(req, res, next) {
        try {
            const { error, value } = userValidator_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new apiError_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserIdValid(req, res, next) {
        try {
            if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.userId)) {
                throw new apiError_1.ApiError("ID is not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidUpdate(req, res, next) {
        try {
            const { error, value } = userValidator_1.UserValidator.updateUser.validate(req.body);
            if (error) {
                throw new apiError_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
