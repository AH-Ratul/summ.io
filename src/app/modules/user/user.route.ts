import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";

export const userRouter: Router = Router();

userRouter.get("/", UserController.getUser);
userRouter.post("/create", UserController.createUser);
userRouter.delete("/:userId", checkAuth(Role.ADMIN), UserController.deleteUser);
