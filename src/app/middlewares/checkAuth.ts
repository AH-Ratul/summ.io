import { NextFunction, Request, Response } from "express";
import AppError from "../helpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envConfig } from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization || req.cookies.accessToken;

      if (!token) {
        throw new AppError(403, "No Token Recieved");
      }

      const verifiedToken = verifyToken(
        token,
        envConfig.JWT.ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });

      if (!isUserExist) {
        throw new AppError(404, "User doesn't exists");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "Permission Denied. You are not authorized.");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
