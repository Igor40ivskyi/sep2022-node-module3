import { Router } from "express";

import { userController } from "../controllers/userController";
import { userMiddleware } from "../middlewares/userMiddleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userMiddleware.getByIdThrow, userController.getById);

router.post("/", userController.create);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

export const userRouter = router;
