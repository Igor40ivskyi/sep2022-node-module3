"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_model_1 = require("../models/User.model");
class UserController {
    async getAll(req, res) {
        const users = await User_model_1.User.find();
        return res.json(users);
    }
    async getById(req, res) {
        const { userId } = req.params;
        const user = await User_model_1.User.findById(userId);
        return res.json(user);
    }
    async create(req, res) {
        const body = req.body;
        const user = await User_model_1.User.create(body);
        return res.status(201).json({
            message: "user created!",
            data: user,
        });
    }
    async update(req, res) {
        const { userId } = req.params;
        const user = req.body;
        const updatedUser = await User_model_1.User.updateOne({ _id: userId }, user);
        return res.status(203).json({
            message: "user updated",
            data: updatedUser,
        });
    }
    async delete(req, res) {
        const { userId } = req.params;
        const user = await User_model_1.User.deleteOne({ _id: userId });
        return res.status(200).json({
            message: "user deleted",
            data: user,
        });
    }
}
exports.userController = new UserController();
