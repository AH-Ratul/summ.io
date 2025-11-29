import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";

const addExpense = async (payload: Prisma.ExpenseUncheckedCreateInput) => {
  const expense = await prisma.expense.create({
    data: payload,
  });

  return expense;
};

const getExpense = async () => {
  const expenses = await prisma.expense.findMany<Prisma.ExpenseFindManyArgs>({
    orderBy: {
      date: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return expenses;
};

const updateExpense = async (
  expenseId: string,
  payload: Prisma.ExpenseUncheckedUpdateInput
) => {
  const isExpenseExist =
    await prisma.expense.findUnique<Prisma.ExpenseFindUniqueArgs>({
      where: { id: expenseId },
    });

  if (!isExpenseExist) {
    throw new AppError(404, "No expense record found");
  }

  const updatedExpense = await prisma.expense.update({
    where: { id: expenseId },
    data: payload,
  });

  return updatedExpense;
};

const deleteExpense = async (expenseId: string) => {
  const isExpenseExist =
    await prisma.expense.findUnique<Prisma.ExpenseFindUniqueArgs>({
      where: { id: expenseId },
    });

  if (!isExpenseExist) {
    throw new AppError(404, "No expense record found");
  }

  return await prisma.expense.delete({
    where: { id: expenseId },
  });
};

export const ExpenseService = {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
