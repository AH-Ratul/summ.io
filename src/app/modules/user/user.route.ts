import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";

export const userRouter: Router = Router();

userRouter.get("/", UserController.getUser);
userRouter.get("/me", checkAuth(...Object.values(Role)), UserController.getMe);

userRouter.post("/register", UserController.createUser);
userRouter.delete(
  "/:userId",
  checkAuth(Role.SUPER_ADMIN),
  UserController.deleteUser
);
