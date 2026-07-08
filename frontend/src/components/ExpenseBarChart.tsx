import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Props {
  expenses: Expense[];
}

function ExpenseBarChart({ expenses }: Props) {
  const categoryTotals: {
    [key: string]: number;
  } = {};

  expenses.forEach((expense) => {
    const category =
      expense.category.charAt(0).toUpperCase() +
      expense.category.slice(1).toLowerCase();

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      expense.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        label: "Amount Spent",

        data: Object.values(categoryTotals),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Spending By Category
      </h2>

      <Bar data={data} />
    </div>
  );
}

export default ExpenseBarChart;