import { Router } from "express";

type TRoute = {
  path: string;
  route: Router;
};

const appRouter: Router = Router();

const moduleRoutes: TRoute[] = [
    
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
