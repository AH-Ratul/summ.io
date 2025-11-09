import { Router } from "express";
import { ProductController } from "./product.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";

export const productRoute: Router = Router();

productRoute.get("/", ProductController.getAllProduct);
productRoute.post("/create", ProductController.createProduct);
productRoute.patch(
  "/:productId",
  checkAuth(Role.ADMIN),
  ProductController.updateProduct
);
productRoute.delete(
  "/:productId",
  checkAuth(Role.ADMIN),
  ProductController.deleteProduct
);
