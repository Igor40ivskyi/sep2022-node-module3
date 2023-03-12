import { Router } from "express";

import { userController } from "../controllers/userController";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userController.getById);

router.post("/", userController.create);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

export const userRouter = router;
