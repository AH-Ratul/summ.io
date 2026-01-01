import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SalesService } from "./sales.service";
import sendResponse from "../../utils/sendResponse";

const createSales = catchAsync(async (req: Request, res: Response) => {
  const result = await SalesService.createSales(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Sales Added",
    data: result,
  });
});

const getSales = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await SalesService.getSales(query as Record<string, any>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sales Retrieved",
    data: result,
  });
});

export const SalesController = {
  createSales,
  getSales,
};
