import { prisma } from "../../config/db";

const getDashboardMetaData = async () => {
  const totalRevenue = await prisma.sales.aggregate({
    _sum: {
      total: true,
    },
  });

  const totalExpense = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
  });

  const totalProduct = await prisma.product.count();

  return {
    totalRevenue,
    totalExpense,
    totalProduct,
  };
};

const getBarChartData = async () => {
  const salesData =
    await prisma.$queryRaw`SELECT extract(MONTH from "createdAt") as month_idx,
        DATE_TRUNC('month',"createdAt") as month,
        sum(total) as t 
        from "Sales"
        group by month_idx, month
        order by month_idx asc
    `;

  const expenseData =
    await prisma.$queryRaw`SELECT extract(MONTH from "date") as month_idx,
        DATE_TRUNC('month',"date") as month,
        sum(amount) as t 
        from "Expense"
        group by month_idx, month
        order by month_idx asc`;

  return { salesData, expenseData };
};

export const MetaServices = {
  getDashboardMetaData,
  getBarChartData,
};
