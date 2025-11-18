import { Response } from "express";
import { envConfig } from "../config";

interface ITokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokens: ITokens) => {
  if (tokens.accessToken) {
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: envConfig.NODE_ENV === "production",
      secure: true,
      sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
    });
  }

  if (tokens.refreshToken) {
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: envConfig.NODE_ENV === "production",
      secure: true,
      sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
    });
  }
};
