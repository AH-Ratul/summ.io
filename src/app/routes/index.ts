import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { productRoute } from "../modules/product/product.route";
import { salesRouter } from "../modules/sales/sales.route";

type TRoute = {
  path: string;
  route: Router;
};

const appRouter: Router = Router();

const moduleRoutes: TRoute[] = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/sales",
    route: salesRouter,
  },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
