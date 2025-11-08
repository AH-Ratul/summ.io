import { Prisma } from "../../../../generated/prisma";
import { envConfig } from "../../config";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";
import bcrypt from "bcryptjs";

const createUser = async (payload: Prisma.UserCreateInput) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isUserExist) {
    throw new AppError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password as string,
    Number(envConfig.SALT)
  );

  const user = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });

  return user;
};

const getUser = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const deleteUser = async (userId: number) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (isUserExist) {
    throw new AppError(404, "user not found");
  }

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return deletedUser;
};

export const UserService = {
  createUser,
  getUser,
  deleteUser,
};
