import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/tokens";
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config";

const credentialsLogin = async (
  payload: Partial<Prisma.UserWhereUniqueInput>
) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(400, "User doesn't exists");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(400, "Incorrect Password");
  }

  const userToken = createToken(isUserExist);

  const { password: pass, ...rest } = isUserExist;

  return {
    userToken,
    user: rest,
  };
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });

  const isOldPassMatched = bcrypt.compare(
    oldPassword,
    user?.password as string
  );

  if (!isOldPassMatched) {
    throw new AppError(400, "Old password doesn't match");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword as string,
    Number(envConfig.SALT)
  );

  const updatedUser = await prisma.user.update({
    where: { id: decodedToken.id },
    data: { password: hashedPassword },
  });

  return updatedUser;
};

export const AuthService = {
  credentialsLogin,
  changePassword,
};
