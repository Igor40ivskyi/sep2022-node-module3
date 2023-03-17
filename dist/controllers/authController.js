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
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = req.res.locals;
            console.log(user);
            const tokenPair = await authService_1.authService.login({ email, password }, user);
            return res.status(200).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
