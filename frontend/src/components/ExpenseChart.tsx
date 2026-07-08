import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
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

function ExpenseChart({
  expenses,
}: Props) {

  const categoryTotals: {
    [key: string]: number;
  } = {};

  expenses.forEach((expense) => {
    const category =
      expense.category;

    if (categoryTotals[category]) {
      categoryTotals[category] +=
        expense.amount;
    } else {
      categoryTotals[category] =
        expense.amount;
    }
  });

  const data = {
    labels: Object.keys(
      categoryTotals
    ),

    datasets: [
      {
        label: "Expenses",

        data: Object.values(
          categoryTotals
        ),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],

        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Expense Analytics
      </h2>

      <div className="max-w-md mx-auto">
        <Pie data={data} />
      </div>

    </div>
  );
}

export default ExpenseChart;