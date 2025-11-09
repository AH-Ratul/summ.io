import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.credentialsLogin(req.body);

  setAuthCookie(res, result.userToken);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login Successfull",
    data: result,
  });
});

const logout = catchAsync(async () => {});

export const AuthController = {
  credentialsLogin,
  logout,
};
