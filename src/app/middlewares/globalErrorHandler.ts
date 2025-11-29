import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // validation error
  if (err instanceof Prisma.PrismaClientValidationError) {
    if (err.name === "PrismaClientValidationError") {
      (statusCode = 400), (message = "Invalid Data Format");
    }
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2003": {
        const f = err.meta?.field_name || "related field";
        statusCode = 400;
        message = `Invalid reference! ${f}. does not match any existing record`;
        break;
      }

      default: {
        statusCode = 400;
        message = `Database error: ${err.code}`;
        break;
      }
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    err: process.env.NODE_ENV === "development" ? err : null,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
