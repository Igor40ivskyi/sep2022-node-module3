"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const router = (0, express_1.Router)();
router.get("/", userController_1.userController.getAll);
router.get("/:userId", userMiddleware_1.userMiddleware.getByIdThrow, userController_1.userController.getById);
router.post("/", userController_1.userController.create);
router.put("/:userId", userController_1.userController.update);
router.delete("/:userId", userController_1.userController.delete);
exports.userRouter = router;
