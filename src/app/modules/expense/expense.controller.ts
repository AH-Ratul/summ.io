import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ExpenseService } from "./expense.service";
import sendResponse from "../../utils/sendResponse";

const addExpense = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.addExpense(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Expense Added",
    data: result,
  });
});

const getExpense = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.getExpense();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Retrieved",
    data: result,
  });
});

const updateExpense = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const result = await ExpenseService.updateExpense(id as string, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Expense Updated",
    data: result,
  });
});

const deleteExpense = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await ExpenseService.deleteExpense(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Deleted",
    data: null,
  });
});

export const ExpenseController = {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
