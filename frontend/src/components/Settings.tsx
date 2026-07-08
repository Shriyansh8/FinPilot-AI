import { useState } from "react";

export default function Settings() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem("monthlyBudget")) || 20000
  );

  const [emailNotification, setEmailNotification] = useState(true);
  const [budgetAlert, setBudgetAlert] = useState(true);
  const [aiNotification, setAiNotification] = useState(true);

  return (

    <div className="space-y-8">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-black">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your FinPilot AI experience.
        </p>

      </div>

      {/* Account */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Account
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Name</span>
            <span>{localStorage.getItem("userName")}</span>
          </div>

          <div className="flex justify-between">
            <span>User ID</span>
            <span>#{localStorage.getItem("userId")}</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <span className="text-green-400">
              Premium User
            </span>

          </div>

        </div>

      </div>

      {/* Notifications */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Notifications
        </h2>

        <div className="space-y-4">

          <label className="flex justify-between">

            Email Notifications

            <input
              type="checkbox"
              checked={emailNotification}
              onChange={() =>
                setEmailNotification(!emailNotification)
              }
            />

          </label>

          <label className="flex justify-between">

            Budget Alerts

            <input
              type="checkbox"
              checked={budgetAlert}
              onChange={() =>
                setBudgetAlert(!budgetAlert)
              }
            />

          </label>

          <label className="flex justify-between">

            AI Insights

            <input
              type="checkbox"
              checked={aiNotification}
              onChange={() =>
                setAiNotification(!aiNotification)
              }
            />

          </label>

        </div>

      </div>

      {/* Budget */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Budget Preferences
        </h2>

        <div className="flex gap-4">

          <input
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(Number(e.target.value))
            }
            className="bg-slate-900 rounded-xl p-4 w-56"
          />

          <button
            onClick={() => {
              localStorage.setItem(
                "monthlyBudget",
                budget.toString()
              );
              alert("Budget Updated");
            }}
            className="bg-violet-600 hover:bg-violet-700 px-6 rounded-xl"
          >
            Save
          </button>

        </div>

      </div>

      {/* Danger */}

      <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-red-400">
          Danger Zone
        </h2>

        <button
          className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
        >
          Delete Account
        </button>

      </div>

    </div>

  );

}