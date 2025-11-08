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
  const parseId = parseInt(userId as unknown as string);

  await UserService.deleteUser(parseId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Deleted",
    data: null,
  });
});

export const UserController = {
  createUser,
  getUser,
  deleteUser,
};
