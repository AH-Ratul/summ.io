import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";

const addCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.addCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category Created",
    data: result,
  });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategory();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Retrieved Successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await CategoryService.deleteCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Deleted Successfully",
    data: null,
  });
});

export const CategoryController = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
