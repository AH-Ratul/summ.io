import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";
import { ExpenseController } from "./expense.controller";

export const expenseRouter: Router = Router();

expenseRouter.get("/", checkAuth(Role.ADMIN), ExpenseController.getExpense);

expenseRouter.post(
  "/addExpense",
  checkAuth(Role.ADMIN),
  ExpenseController.addExpense
);

expenseRouter
  .route("/:id")
  .patch(checkAuth(Role.ADMIN), ExpenseController.updateExpense)
  .delete(checkAuth(Role.ADMIN), ExpenseController.deleteExpense);
