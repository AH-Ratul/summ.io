import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";

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
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
