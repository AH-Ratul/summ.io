import { Router } from "express";
import { SalesController } from "./sales.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";

export const salesRouter: Router = Router();

salesRouter.get(
  "/",
  checkAuth(...Object.values(Role)),
  SalesController.getSales
);
salesRouter.post(
  "/create",
  checkAuth(...Object.values(Role)),
  SalesController.createSales
);
