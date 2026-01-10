import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../../generated/prisma";
import { ExpenseController } from "./expense.controller";

export const expenseRouter: Router = Router();

expenseRouter.get("/", checkAuth(Role.SUPER_ADMIN), ExpenseController.getExpense);

expenseRouter.post(
  "/addExpense",
  checkAuth(Role.SUPER_ADMIN),
  ExpenseController.addExpense
);

expenseRouter
  .route("/:id")
  .patch(checkAuth(Role.SUPER_ADMIN), ExpenseController.updateExpense)
  .delete(checkAuth(Role.SUPER_ADMIN), ExpenseController.deleteExpense);
