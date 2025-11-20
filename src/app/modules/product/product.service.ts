import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../helpers/AppError";

const createProduct = async (payload: Prisma.ProductCreateInput) => {
  const product = await prisma.product.create({ data: payload });

  return product;
};

const getAllProduct = async (query: any) => {
  const product = await prisma.product.findMany({
    where: {
      product_name: {
        contains: query.search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return product;
};

const updateProduct = async (
  productId: string,
  payload: Partial<Prisma.ProductUpdateInput>
) => {
  const isProductExist = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!isProductExist) {
    throw new AppError(404, "Product Not Found");
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: payload,
  });

  return updatedProduct;
};

const deleteProduct = async (productId: string) => {
  return await prisma.product.delete({
    where: { id: productId },
  });
};

export const ProductService = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
