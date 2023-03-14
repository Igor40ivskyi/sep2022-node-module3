import { Router } from "express";

import { userController } from "../controllers/userController";
import { userMiddleware } from "../middlewares/userMiddleware";

const router = Router();

router.get("/", userController.getAll);

router.post("/", userController.create);

router.get(
  "/:userId",
  userMiddleware.isValidUserCreate,
  userMiddleware.getByIdThrow,
  userController.getById
);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

export const userRouter = router;
