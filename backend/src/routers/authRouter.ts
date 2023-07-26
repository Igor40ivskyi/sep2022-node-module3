import { Router } from "express";

import { authController } from "../controllers/authController";
import { userMiddleware } from "../middlewares/userMiddleware";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidUserCreate,
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);
router.post("/login");

export const authRouter = router;
