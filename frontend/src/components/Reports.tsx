export default function Reports() {

  const totalExpenses =
    Number(localStorage.getItem("totalExpenses") || 0);

  const monthlyBudget =
    Number(localStorage.getItem("monthlyBudget") || 20000);

  const savings =
    monthlyBudget - totalExpenses;

  const health =
    totalExpenses < monthlyBudget * 0.7
      ? "Excellent"
      : totalExpenses < monthlyBudget
      ? "Good"
      : "Poor";

  return (

    <div className="space-y-8">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-bold">
          Financial Reports
        </h1>

        <p className="text-slate-400 mt-2">
          View your financial performance and download reports.
        </p>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="bg-slate-900/40 rounded-2xl p-6">

          <p className="text-slate-400">
            Total Expenses
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">
            ₹{totalExpenses}
          </h2>

        </div>

        <div className="bg-slate-900/40 rounded-2xl p-6">

          <p className="text-slate-400">
            Budget
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            ₹{monthlyBudget}
          </h2>

        </div>

        <div className="bg-slate-900/40 rounded-2xl p-6">

          <p className="text-slate-400">
            Savings
          </p>

          <h2 className="text-4xl font-bold text-violet-400 mt-2">
            ₹{savings}
          </h2>

        </div>

        <div className="bg-slate-900/40 rounded-2xl p-6">

          <p className="text-slate-400">
            Financial Health
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {health}
          </h2>

        </div>

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Reports
        </h2>

        <div className="space-y-4">

          <div className="bg-slate-900/40 rounded-xl p-5 flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                Monthly Report
              </h3>

              <p className="text-slate-400 text-sm">
                Generated automatically
              </p>

            </div>

            <button className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-xl">
              Download PDF
            </button>

          </div>

          <div className="bg-slate-900/40 rounded-xl p-5 flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                Expense Summary
              </h3>

              <p className="text-slate-400 text-sm">
                Latest overview
              </p>

            </div>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl">
              Download PDF
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}