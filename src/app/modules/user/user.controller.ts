import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User Created",
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUser();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Retrieved ",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await UserService.deleteUser(userId as unknown as number);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Deleted",
    data: result,
  });
});

export const UserController = {
  createUser,
  getUser,
  deleteUser,
};
