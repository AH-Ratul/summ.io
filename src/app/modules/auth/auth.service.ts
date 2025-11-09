import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/tokens";

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

const logout = async () => {};

export const AuthService = {
  credentialsLogin,
  logout,
};
