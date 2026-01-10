import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";
import { CategoryController } from "./category.controller";

export const categoryRouter: Router = Router();

categoryRouter.get("/", checkAuth(Role.SUPER_ADMIN), CategoryController.getCategory);

categoryRouter.post(
  "/add", 
  checkAuth(Role.SUPER_ADMIN),
  CategoryController.addCategory
);

categoryRouter
  .route("/:id")
  .patch(checkAuth(Role.SUPER_ADMIN), CategoryController.updateCategory)
  .delete(checkAuth(Role.SUPER_ADMIN), CategoryController.deleteCategory);
