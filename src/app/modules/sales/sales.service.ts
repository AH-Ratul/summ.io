import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";

const createSales = async (payload: Prisma.SalesCreateInput) => {
  const sales = await prisma.sales.create({
    data: payload,
  });

  return sales;
};

const getSales = async () => {
  const allSales = await prisma.sales.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: {
        select: {
          product_name: true,
          price: true,
          stock: true,
        },
      },
      user: {
        select: {
          name: true,
          role: true,
        },
      },
    },
  });

  return allSales;
};

export const SalesService = {
  createSales,
  getSales,
};
