import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    err: process.env.NODE_ENV === "development" ? err : null,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
