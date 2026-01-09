import {
  endOfDay,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subYears,
} from "date-fns";
import { Prisma, Sales } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";

const createSales = async (payload: Prisma.SalesUncheckedCreateInput) => {
  const product = await prisma.product.findUnique<Prisma.ProductFindUniqueArgs>(
    {
      where: {
        id: payload.productId,
      },
    }
  );

  const qtyInNumber = Number(payload.quantity);
  const productPrice = product?.price as number;

  const total = qtyInNumber * productPrice;

  if (qtyInNumber > product?.stock!) {
    throw new AppError(
      400,
      `Insufficient stock. Only ${product?.stock} items available.`
    );
  }

  const finalData = {
    productId: payload.productId,
    userId: payload.userId,
    quantity: qtyInNumber,
    total,
  };

  const updatedStock = product?.stock! - qtyInNumber;

  const sales = await prisma.sales.create({
    data: finalData,
  });

  await prisma.product.update<Prisma.ProductUpdateArgs>({
    where: {
      id: product?.id!,
    },
    data: {
      stock: updatedStock,
    },
  });

  return sales;
};

const getSales = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const range = query.range;

  const filter: Prisma.SalesWhereInput = {};

  if (range && range !== "all-time") {
    let startDate: Date | null = null;
    const now = new Date();

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
      filter.createdAt = {
        gte: startDate,
        lt: endOfDay(now),
      };
    }
  }

  const allSales = await prisma.sales.findMany<Prisma.SalesFindManyArgs>({
    where: filter,
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
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

  const totalCount = await prisma.sales.count({ where: filter });

  const totalPage = Math.ceil(totalCount / limit);

  return { page, limit, totalPage, allSales };
};

export const SalesService = {
  createSales,
  getSales,
};
