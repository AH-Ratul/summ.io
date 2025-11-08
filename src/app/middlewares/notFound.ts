import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API NOT FOUND",
    err: {
      path: req.originalUrl,
      message: "your requested path is not found",
    },
  });
};
