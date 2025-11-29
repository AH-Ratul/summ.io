import { Prisma } from "../../../../generated/prisma";
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

const getSales = async () => {
  const allSales = await prisma.sales.findMany<Prisma.SalesFindManyArgs>({
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
