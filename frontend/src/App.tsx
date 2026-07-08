import { useEffect, useState } from "react";
import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaTrash,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ExpenseChart from "./components/ExpenseChart";
import ExpenseBarChart from "./components/ExpenseBarChart";
import Login from "./components/Login";
import Register from "./components/Register";
import Goals from "./components/Goals";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import LoadingScreen from "./components/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [insights, setInsights] = useState<string[]>([]);
  const [aiAdvice, setAiAdvice] =useState("");
  const [aiGeneratedAt,setAiGeneratedAt] =useState("");
  const [loadingAI, setLoadingAI] =useState(false);
  const [loggedIn, setLoggedIn] =useState(localStorage.getItem("loggedIn") === "true");
  const [showRegister, setShowRegister] =useState(false);
  const userName =localStorage.getItem("userName");
  const [reports, setReports] = useState<any[]>([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = () => {
  const userId =
    localStorage.getItem("userId");
    fetch(
  `http://127.0.0.1:5000/expenses/${userId}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched expenses:", data);
    setExpenses(data);
  });

  
};

  useEffect(() => {
  if (loggedIn) {
    fetchExpenses();
    fetchBudget();
    fetchReports();
  } 
}, [loggedIn]);
useEffect(() => {

  const timer = setTimeout(() => {

    setLoading(false);

  }, 2000);

  return () => clearTimeout(timer);

}, []);
useEffect(() => {
  generateInsights();
  generateAIAdvice();
}, [expenses, monthlyBudget]);
  const fetchBudget = () => {
    const userId =
  localStorage.getItem("userId");

fetch(
  `http://127.0.0.1:5000/budget/${userId}`
)
  
    .then((response) =>
      response.json()
    )
    .then((data) => {
      setMonthlyBudget(
        data.amount
      );
    });
};

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  useEffect(() => {

  localStorage.setItem(
    "totalExpenses",
    totalExpenses.toString()
  );

}, [totalExpenses]);

  const totalTransactions = expenses.length;

  const averageExpense =
    totalTransactions > 0
      ? (totalExpenses / totalTransactions).toFixed(2)
      : "0";

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;
      const remainingBudget =
  monthlyBudget - totalExpenses;

const budgetPercentage =
  totalExpenses > 0
    ? Math.min(
        (totalExpenses / monthlyBudget) * 100,
        100
      )
    : 0;
    const budgetStatus =
  budgetPercentage >= 100
    ? "Exceeded"
    : budgetPercentage >= 80
    ? "Warning"
    : "Safe";
    useEffect(() => {

  if (
    budgetPercentage >= 80 &&
    budgetPercentage < 100
  ) {

    toast.warning(
      `Budget Usage: ${budgetPercentage.toFixed(0)}%`
    );

  }

  if (
    budgetPercentage >= 100
  ) {

    toast.error(
      "Budget Exceeded!"
    );

  }

}, [budgetPercentage]);
  const calculateHealthScore = () => {

  let score = 0;

  if (budgetPercentage < 50) {

    score += 40;

  } else if (
    budgetPercentage < 80
  ) {

    score += 30;

  } else if (
    budgetPercentage < 100
  ) {

    score += 20;

  } else {

    score += 10;

  }

  if (
    remainingBudget >
    monthlyBudget * 0.5
  ) {

    score += 30;

  } else if (
    remainingBudget >
    monthlyBudget * 0.2
  ) {

    score += 20;

  } else {

    score += 10;

  }

  if (
    totalExpenses < 2000
  ) {

    score += 30;

  } else if (
    totalExpenses < 5000
  ) {

    score += 20;

  } else {

    score += 10;

  }

  return score;

};

const healthScore =
  calculateHealthScore();
  const healthStatus =
  healthScore >= 80
    ? "Excellent"
    : healthScore >= 60
    ? "Good"
    : healthScore >= 40
    ? "Average"
    : "Poor";

  const filteredExpenses =
  expenses.filter((expense) => {

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    const matchesSearch =
      expense.description
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      expense.category
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    return (
      matchesCategory &&
      matchesSearch
    );

  });
  const fetchReports = () => {

  const userId =
    localStorage.getItem("userId");

  fetch(
    `http://127.0.0.1:5000/reports/${userId}`
  )
    .then((response) =>
      response.json()
    )
    .then((data) =>
      setReports(data)
    );
};

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return "bg-green-500/20 text-green-400";
      case "shopping":
        return "bg-purple-500/20 text-purple-400";
      case "entertainment":
        return "bg-orange-500/20 text-orange-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };
  const handleEdit = (
  expense: Expense
) => {

  setAmount(
    expense.amount.toString()
  );

  setCategory(
    expense.category
  );

  setDescription(
    expense.description
  );

  setEditingId(expense.id);

  setIsEditing(true);
};
  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (
    !amount ||
    !category ||
    !description
  ) {
    toast.error("Please fill all fields");
    return;
  }

  if (isEditing) {

    await fetch(
      `http://127.0.0.1:5000/expenses/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
        amount: Number(amount),
        category,
        description,
        date: new Date()
        .toISOString()
        .split("T")[0],

        user_id: Number(
        localStorage.getItem(
        "userId")),
}),});
toast.success("Expense Updated Successfully!");

  } else {

    await fetch(
      "http://127.0.0.1:5000/expenses",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          category,
          description,
          date: new Date()
            .toISOString()
            .split("T")[0],
          user_id: Number(
          localStorage.getItem("userId")),
        }),
      }
    );
    toast.success("Expense Added Successfully!");

  }

  setAmount("");
  setCategory("");
  setDescription("");
  setEditingId(null);
  setIsEditing(false);

  fetchExpenses();
};

const deleteExpense = async (
  id: number
) => {

  await fetch(
    `http://127.0.0.1:5000/expenses/${id}`,
    {
      method: "DELETE",
    }
  );

  toast.success(
    "Expense Deleted Successfully!"
  );

  fetchExpenses();
};
const generateInsights = () => {

  const newInsights: string[] = [];

  if (expenses.length === 0) {
    newInsights.push(
      "No expenses available to analyze."
    );

    setInsights(newInsights);
    return;
  }

  const categoryTotals: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {

    categoryTotals[
      expense.category
    ] =
      (categoryTotals[
        expense.category
      ] || 0) +
      expense.amount;

  });

  const highestCategory =
    Object.keys(
      categoryTotals
    ).reduce((a, b) =>
      categoryTotals[a] >
      categoryTotals[b]
        ? a
        : b
    );

  newInsights.push(
  `You spend most of your money on ${highestCategory}.`
);

newInsights.push(
  `Your total spending this month is ₹${totalExpenses}.`
);

newInsights.push(
  `Your largest single expense was ₹${highestExpense}.`
);

if (highestCategory === "Shopping") {

  newInsights.push(
    "Consider reducing shopping expenses to improve savings."
  );

}

if (highestCategory === "Food") {

  newInsights.push(
    "Frequent food expenses detected. Meal planning could help save money."
  );

}

if (highestCategory === "Entertainment") {

  newInsights.push(
    "Entertainment spending is high. Consider setting a monthly limit."
  );

}
  if (budgetPercentage < 50) {

    newInsights.push(
      "Budget status: Safe"
    );

  } else if (
    budgetPercentage < 80
  ) {

    newInsights.push(
      "Budget status: Warning"
    );

  } else {

    newInsights.push(
      "Budget status: Danger"
    );

  }

  setInsights(newInsights);
};
const generateAIAdvice = async () => {

  try {

    setLoadingAI(true);

    const userId =
      localStorage.getItem("userId");

    const response = await fetch(
      `http://127.0.0.1:5000/ai-advice/${userId}`
    );

    const data =
      await response.json();

    setAiAdvice(data.advice);
    setAiGeneratedAt(new Date().toLocaleString());
    toast.success("AI Advice Generated!");

  } catch (error) {

    setAiAdvice(
      "Unable to generate AI advice."
    );

    console.error(error);

  } finally {

    setLoadingAI(false);

  }

};
const handleLogout = () => {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  setExpenses([]);
  setMonthlyBudget(0);
  toast.info("Logged Out Successfully");

  setLoggedIn(false);
};
if (loading) {
  return <LoadingScreen />;
}

if (!loggedIn) {
  return showRegister ? (
    <Register
      onSwitchToLogin={() =>
        setShowRegister(false)
      }
    />
  ) : (
    <Login
  onLogin={() => {
    setLoggedIn(true);

    setTimeout(() => {
      fetchExpenses();
      fetchBudget();
    }, 100);
  }}
  onSwitchToRegister={() =>
    setShowRegister(true)
  }
/>
  );
}
const downloadReport = () => {

  const userId =
    localStorage.getItem("userId");

  window.open(
    `http://127.0.0.1:5000/download-report/${userId}`
  );
  toast.success("Report Download Started");

  setTimeout(() => {
    fetchReports();
  }, 1000);

};
if (activePage === "goals") {
  return (
    <>
      <Sidebar
  handleLogout={handleLogout}
  activePage={activePage}
  setActivePage={setActivePage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="ml-72 p-6">
        <Goals />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </>
  );
}
if (activePage === "settings") {
  return (
    <>
      <Sidebar
        handleLogout={handleLogout}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="lg:ml-72 p-8">
        <Settings />
      </div>

      <ToastContainer
        position="top-right"
        theme="dark"
      />
    </>
  );
}
if (activePage === "profile") {
  return (
    <>
      <Sidebar
  handleLogout={handleLogout}
  activePage={activePage}
  setActivePage={setActivePage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="ml-72 p-6">
        <Profile />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </>
  );
}
if (activePage === "reports") {
  return (
    <>
      <Navbar
  setSidebarOpen={setSidebarOpen}
/>

      <Sidebar
        handleLogout={handleLogout}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="lg:ml-72 p-8">
        <Reports />
      </main>

      <ToastContainer
        position="top-right"
        theme="dark"
      />
    </>
  );
}


return (
<>
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      <Sidebar handleLogout={handleLogout} 
      activePage={activePage}
  setActivePage={setActivePage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
      <Navbar setSidebarOpen={setSidebarOpen} />
      
      <div className="lg:ml-72 max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 mb-6 shadow-2xl">
  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

    {/* LEFT SIDE */}
    <div>

      <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">
        Personal Dashboard
      </p>
      <h2 className="text-2xl md:text-3xl font-black">
  Good to see you again,
  <span className="ml-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
    {userName}
  </span>
</h2>
      

      <p className="text-slate-400 mt-4 max-w-lg">
        Track expenses, analyze spending habits, receive AI-powered recommendations and build long-term wealth intelligently.
      </p>

    </div>

    {/* RIGHT SIDE */}
    <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">

      <div className="bg-slate-900/50 px-5 py-3 rounded-xl">
        <p className="text-slate-400 text-sm">
          Monthly Budget
        </p>
        {budgetPercentage >= 80 && (

  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mt-4 mb-4">

    ⚠️ Warning:
    You have used
    {budgetPercentage.toFixed(0)}%
    of your budget.

  </div>

)}

        <h3 className="text-green-400 font-bold text-xl">
          ₹{monthlyBudget}
        </h3>
      </div>

      <div className="bg-slate-900/50 px-5 py-3 rounded-xl">
        <p className="text-slate-400 text-sm">
          Expenses
        </p>

        <h3 className="text-red-400 font-bold text-xl">
          ₹{totalExpenses}
        </h3>
      </div>

    </div>

  </div>
</div>

</div>
<div className="lg:ml-72 max-w-7xl mx-auto px-4 md:px-6 py-2">
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8 shadow-xl">
<h2 className="text-2xl font-semibold mb-5">Add New Expense</h2>
<form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
<input

  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  className="bg-slate-800 rounded-xl p-4"/>
<select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="bg-slate-800 rounded-xl p-4"
>
  <option value="">
    Select Category
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Entertainment">
    Entertainment
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Health">
    Health
  </option>


  <option value="Education">
    Education
  </option>

  <option value="Bills">
    Bills
  </option>
</select>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 rounded-xl p-4"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              <>
  <FaPlus />
  {isEditing
    ? "Update Expense"
    : "Add Expense"}
</>
            </button>
          </form>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-4">

  <h2 className="text-2xl font-bold">
    Monthly Budget
  </h2>

  <div className="flex items-center gap-3">

    <label className="text-slate-400">
      Budget
    </label>

    <input
  type="number"
  value={monthlyBudget}
  onChange={async (e) => {

    const newBudget =
      Number(e.target.value);

    setMonthlyBudget(
      newBudget
    );

    await fetch(
      "http://127.0.0.1:5000/budget",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
  amount: newBudget,
  user_id: Number(
    localStorage.getItem(
      "userId"
    )
  ),
}),
      }
    );

  }}
  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 w-24 text-center text-green-400 font-bold"
/>

  </div>

</div>

  <div className="flex justify-between text-slate-400 mb-3">

    <span>
      Spent: ₹{totalExpenses}
    </span>

    <span>
      Remaining: ₹{remainingBudget}
    </span>

  </div>

 <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
  <div
    className={`h-4 transition-all duration-700 ${
      budgetPercentage >= 100
        ? "bg-red-500"
        : budgetPercentage >= 80
        ? "bg-yellow-500"
        : "bg-green-500"
    }`}
    style={{
      width: `${budgetPercentage}%`,
    }}
  ></div>
</div>

  <p className="text-center mt-3 text-slate-300">

    {budgetPercentage.toFixed(0)}%
    of budget used

  </p>
  <div className="flex justify-center mt-3">
  <span
    className={`px-4 py-1 rounded-full font-semibold ${
      budgetStatus === "Safe"
        ? "bg-green-500/20 text-green-400"
        : budgetStatus === "Warning"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {budgetStatus}
  </span>
</div>

</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <FaWallet className="text-3xl text-green-400 mb-4" />
            <p className="text-slate-400">Total Expenses</p>
            <h2 className="text-4xl font-bold">₹{totalExpenses}</h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <FaChartLine className="text-3xl text-blue-400 mb-4" />
            <p className="text-slate-400">Transactions</p>
            <h2 className="text-4xl font-bold">{totalTransactions}</h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <FaMoneyBillWave className="text-3xl text-yellow-400 mb-4" />
            <p className="text-slate-400">Average Expense</p>
            <h2 className="text-4xl font-bold">₹{averageExpense}</h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <FaWallet className="text-3xl text-red-400 mb-4" />
            <p className="text-slate-400">Highest Expense</p>
            <h2 className="text-4xl font-bold">₹{highestExpense}</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">

  <div className="text-3xl mb-4">
    ❤️
  </div>

  <p className="text-slate-400">
    Financial Health
  </p>

  <h2 className="text-4xl font-bold">
    {healthScore}
  </h2>

  <span
    className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
      healthStatus === "Excellent"
        ? "bg-green-500/20 text-green-400"
        : healthStatus === "Good"
        ? "bg-blue-500/20 text-blue-400"
        : healthStatus === "Average"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {healthStatus}
  </span>

</div>
</div>
<div className="flex flex-col lg:flex-row gap-4 mb-8">

<button
  onClick={generateAIAdvice}
  disabled={loadingAI}
  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
>
  {loadingAI ? (
  <>
    ⏳ Generating AI Advice...
  </>
) : (
  <>
    Generate AI Insights
  </>
)}
</button>
  <button
  onClick={downloadReport}
  className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold"
>
  📄 Download Report
</button>

  <input
    type="text"
    placeholder="Search expenses..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white w-full"
  />

  <select
  value={selectedCategory}
  onChange={(e) =>
    setSelectedCategory(e.target.value)
  }
  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 w-full lg:w-auto"
>
  <option value="All">
    All Categories
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Entertainment">
    Entertainment
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Health">
    Health
  </option>

  <option value="Education">
    Education
  </option>

  <option value="Bills">
    Bills
  </option>
</select>

</div>

        
        {/* Analytics Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">

<div className="flex items-center gap-3">

  <div className="text-3xl">
    🤖
  </div>

  <div>
  <h2 className="text-2xl font-bold">
  FinPilot AI Assistant
</h2>
    

    <p className="text-sm text-slate-400">
      Powered by Groq AI
    </p>
  </div>

</div>
  <p className="text-slate-400 text-sm mb-4">

  Last Generated:
  {aiGeneratedAt || " Not Generated Yet"}

</p>
<div className="space-y-4 mt-6">

  {aiAdvice
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index) => (

      <div
        key={index}
        className="bg-slate-900/40 border border-white/10 rounded-2xl p-4 flex gap-4 items-start"
      >

        <div className="text-2xl">
          🤖
        </div>

        <p className="text-slate-300 leading-7">
          {line}
        </p>

      </div>

    ))}

</div>

  

</div>
        {insights.length > 0 && (

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">

    <h2 className="text-2xl font-bold mb-4">
      Smart Spending Insights
    </h2>

    <ul className="space-y-3">

      {insights.map(
        (insight, index) => (

          <li
            key={index}
            className="text-slate-300"
          >
            • {insight}
          </li>

        )
      )}

    </ul>

  </div>

)}

<div className="mb-10">
  <div className="grid lg:grid-cols-2 gap-6 mb-10">
  <ExpenseChart expenses={filteredExpenses} />
  <ExpenseBarChart expenses={filteredExpenses} />
</div>
<div className="bg-white/5 rounded-3xl p-6 border border-white/10 mt-8">

  <h2 className="text-2xl font-bold text-white mb-4">
    Report History
  </h2>

  {reports.length === 0 ? (

    <p className="text-gray-400">
      No reports generated yet.
    </p>

  ) : (

    <div className="space-y-3">

      {reports.map((report) => (

        <div
          key={report.id}
          className="flex justify-between items-center bg-white/5 p-4 rounded-xl"
        >

          <div>

            <p className="text-white font-semibold">
              {report.filename}
            </p>

            <p className="text-gray-400 text-sm">
              {report.generated_on}
            </p>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
</div>
<div className="grid gap-5">

{filteredExpenses.length === 0 ? (

<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center">

<div className="text-7xl mb-6">
💰
</div>

<h2 className="text-3xl font-bold">
No Expenses Yet
</h2>

<p className="text-slate-400 mt-3">
Add your first expense to start tracking your finances.
</p>

</div>

) : (

filteredExpenses.map((expense) => (
    <div
      key={expense.id}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
              expense.category
            )}`}
          >
            {expense.category}
          </span>

          <h3 className="text-2xl md:text-3xl font-bold mt-4">
            ₹{expense.amount}
          </h3>

          <p className="text-slate-400 mt-2">
            {expense.description}
          </p>

          <p className="text-slate-500 text-sm mt-2">
            {expense.date}
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => handleEdit(expense)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => deleteExpense(expense.id)}
            className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
))

)}
</div>
</div>
</div>
<footer className="text-center py-10 text-slate-500">

  Built with ❤️ using React + Flask

  <br />

  © 2026 FinPilot AI

</footer>
<ToastContainer
  position="top-right"
  autoClose={3000}
  theme="dark"
/>

</>

);
}

export default App;
