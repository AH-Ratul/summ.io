import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";

export const authRoute: Router = Router();

authRoute.post("/login", AuthController.credentialsLogin);
authRoute.post("/logout", AuthController.logout);
authRoute.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  AuthController.changePassword
);
