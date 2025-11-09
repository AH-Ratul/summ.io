import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoute: Router = Router();

authRoute.post("/login", AuthController.credentialsLogin);
authRoute.post("/logout", AuthController.logout);
