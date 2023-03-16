"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    async register(req, res, next) {
        try {
            await authService_1.authService.register(req.body);
            res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
