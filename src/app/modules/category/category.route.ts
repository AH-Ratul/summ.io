import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";
import { CategoryController } from "./category.controller";

export const categoryRouter: Router = Router();

categoryRouter.get("/", checkAuth(Role.ADMIN), CategoryController.getCategory);

categoryRouter.post(
  "/add", 
  checkAuth(Role.ADMIN),
  CategoryController.addCategory
);

categoryRouter
  .route("/:id")
  .patch(checkAuth(Role.ADMIN), CategoryController.updateCategory)
  .delete(checkAuth(Role.ADMIN), CategoryController.deleteCategory);
