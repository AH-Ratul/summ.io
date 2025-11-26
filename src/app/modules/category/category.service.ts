import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";

const addCategory = async (payload: Prisma.CategoryCreateInput) => {
  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getCategory = async () => {
  return await prisma.category.findMany();
};

const updateCategory = async (id: string) => {};

const deleteCategory = async (id: string) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isCategoryExists) {
    throw new AppError(404, "Category doesn't exists");
  }

  const deletedCategory = await prisma.category.delete({
    where: {
      id,
    },
  });

  return deletedCategory;
};

export const CategoryService = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
