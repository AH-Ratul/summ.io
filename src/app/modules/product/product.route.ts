import { Router } from "express";
import { ProductController } from "./product.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";

export const productRoute: Router = Router();

productRoute.get("/", ProductController.getAllProduct);
productRoute.post("/create", ProductController.createProduct);
productRoute.patch(
  "/:productId",
  checkAuth(Role.SUPER_ADMIN),
  ProductController.updateProduct
);
productRoute.delete(
  "/:productId",
  checkAuth(Role.SUPER_ADMIN),
  ProductController.deleteProduct
);
