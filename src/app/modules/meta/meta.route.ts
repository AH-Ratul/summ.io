import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";
import { MetaController } from "./meta.controller";

export const metaRoute: Router = Router();

metaRoute.get(
  "/",
  checkAuth(Role.ADMIN, Role.STAFF),
  MetaController.getDashboardMetaData
);

metaRoute.get(
  "/barchart",
  checkAuth(Role.ADMIN, Role.STAFF),
  MetaController.getBarChartData
);
