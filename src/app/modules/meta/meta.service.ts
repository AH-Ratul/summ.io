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
  const salesData: any =
    await prisma.$queryRaw`SELECT extract(MONTH from "createdAt") as month_idx,
        DATE_TRUNC('month',"createdAt") as month,
        sum(total) as t 
        from "Sales"
        group by month_idx, month
        order by month_idx asc
    `;

  const expenseData: any =
    await prisma.$queryRaw`SELECT extract(MONTH from "date") as month_idx,
        DATE_TRUNC('month',"date") as month,
        sum(amount) as t 
        from "Expense"
        group by month_idx, month
        order by month_idx asc`;

  const mergedData: any = {};

  salesData.forEach((item: any) => {
    if (!mergedData[item.month_idx]) {
      mergedData[item.month_idx] = {
        name: item.month_idx,
        sales: 0,
        expense: 0,
      };
    }
    mergedData[item.month_idx].sales = item.t;
  });

  expenseData.forEach((item: any) => {
    if (!mergedData[item.month_idx]) {
      mergedData[item.month_idx] = {
        name: item.month_idx,
        sales: 0,
        expense: 0,
      };
    }
    mergedData[item.month_idx].expense = item.t;
  });

  const chartdata = Object.values(mergedData);

  return { chartdata };
};

export const MetaServices = {
  getDashboardMetaData,
  getBarChartData,
};
