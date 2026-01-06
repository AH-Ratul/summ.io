import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { MetaServices } from "./meta.service";
import sendResponse from "../../utils/sendResponse";

const getDashboardMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaServices.getDashboardMetaData();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meta Data Retrieved",
    data: result,
  });
});

const getBarChartData = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaServices.getBarChartData();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meta Data Retrieved",
    data: result,
  });
});

export const MetaController = {
  getDashboardMetaData,
  getBarChartData,
};
