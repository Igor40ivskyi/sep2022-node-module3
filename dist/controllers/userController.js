"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_model_1 = require("../models/User.model");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await User_model_1.User.find();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { user } = res.locals;
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body;
            const user = await User_model_1.User.create(body);
            return res.status(201).json({
                message: "user created!",
                data: user,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const updatedUser = await User_model_1.User.findByIdAndUpdate(userId, { ...req.body }, { new: true });
            return res.status(201).json(updatedUser);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await User_model_1.User.deleteOne({ _id: userId });
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
