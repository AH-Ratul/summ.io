import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config";

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

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your are Logged Out",
    data: null,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  await AuthService.changePassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password Changed Successfully",
    data: null,
  });
});

export const AuthController = {
  credentialsLogin,
  logout,
  changePassword,
};
