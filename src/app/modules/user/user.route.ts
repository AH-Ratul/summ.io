import { Router } from "express";
import { UserController } from "./user.controller";

export const userRouter: Router = Router();

userRouter.get("/", UserController.getUser);
userRouter.post("/create", UserController.createUser);
userRouter.delete("/:userId", UserController.deleteUser);
