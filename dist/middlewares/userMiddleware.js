"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const User_model_1 = require("../models/User.model");
class UserMiddleware {
    async getByIdThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_model_1.User.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }
            next();
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
