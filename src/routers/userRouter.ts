import { Router } from "express";

import { userController } from "../controllers/userController";
import { userMiddleware } from "../middlewares/userMiddleware";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.createUserValidator, userController.create);

router.get(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.isUserValidUpdate,
  userController.update
);

router.delete("/:userId", userMiddleware.isUserIdValid, userController.delete);

export const userRouter = router;
