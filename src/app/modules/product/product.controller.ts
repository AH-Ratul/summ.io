import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product Created",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ProductService.getAllProduct(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product Successfully Retrieved",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await ProductService.updateProduct(
    productId as string,
    req.body
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product Updated Successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  await ProductService.deleteProduct(productId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product Deleted",
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
