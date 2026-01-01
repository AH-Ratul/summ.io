import {
  endOfDay,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subYears,
} from "date-fns";
import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";

const addExpense = async (payload: Prisma.ExpenseUncheckedCreateInput) => {
  const expense = await prisma.expense.create({
    data: payload,
  });

  return expense;
};

const getExpense = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const range = query.range || "";
  const searchQ = query.search || "";
  const cat = query.category || "";

  const filter: Prisma.ExpenseWhereInput = {};

  if (cat && cat !== "all") {
    filter.category = {
      name: cat,
    };
  }

  if (range && range !== "all-time") {
    let startDate: Date | null = null;
    let now = new Date();

    switch (range) {
      case "today":
        startDate = startOfDay(now);
        break;
      case "last-7-days":
        startDate = subDays(now, 7);
        break;
      case "last-15-days":
        startDate = subDays(now, 15);
        break;
      case "last-30-days":
        startDate = subDays(now, 30);
        break;
      case "this-month":
        startDate = startOfMonth(now);
        break;
      case "this-year":
        startDate = startOfYear(now);
        break;
      case "last-year":
        startDate = subYears(now, 1);
        break;
      default:
        startDate = null;
    }

    if (startDate) {
      filter.date = {
        gte: startDate,
        lt: endOfDay(now),
      };
    }
  }

  if (searchQ) {
    filter.title = {
      contains: searchQ,
      mode: "insensitive",
    };
  }

  const expenses = await prisma.expense.findMany<Prisma.ExpenseFindManyArgs>({
    where: filter,
    orderBy: {
      date: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const totalCount = await prisma.expense.count({ where: filter });

  const totalPage = Math.ceil(totalCount / limit);

  return { page, limit, totalPage, expenses };
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
