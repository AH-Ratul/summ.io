import { Router } from "express";
import { userRouter } from "../modules/user/user.route";

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
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
