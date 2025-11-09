import { Prisma } from "../../../generated/prisma";
import { envConfig } from "../config";
import { generateToken } from "./jwt";

export const createToken = (user: Partial<Prisma.UserWhereUniqueInput>) => {
  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload as unknown as string,
    envConfig.JWT.ACCESS_SECRET,
    envConfig.JWT.ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload as unknown as string,
    envConfig.JWT.REFRESH_SECRET,
    envConfig.JWT.REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
