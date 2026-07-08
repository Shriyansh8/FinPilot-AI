import { useState, useEffect } from "react";
export default function Goals() {

  const [goalName, setGoalName] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [savedAmount, setSavedAmount] =
    useState("");
  const [goals, setGoals] = useState<any[]>(() => {

  const savedGoals =
    localStorage.getItem("goals");

  return savedGoals
    ? JSON.parse(savedGoals)
    : [];

});
  const totalTarget = goals.reduce(
  (sum, goal) => sum + goal.target,
  0
);

const totalSaved = goals.reduce(
  (sum, goal) => sum + goal.saved,
  0
);

const completedGoals = goals.filter((goal) => goal.saved >= goal.target).length;
useEffect(() => {

  localStorage.setItem(
    "goals",
    JSON.stringify(goals)
  );

}, [goals]);
const createGoal = () => {

  if (!goalName || !targetAmount)
    return;

  const newGoal = {
    id: Date.now(),
    name: goalName,
    target: Number(targetAmount),
    saved: Number(savedAmount || 0),
  };

  setGoals([...goals, newGoal]);

  setGoalName("");
  setTargetAmount("");
  setSavedAmount("");
};

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Savings Goals
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">

  <div className="bg-slate-900/40 rounded-2xl p-5">
    <p className="text-slate-400">
      Total Target
    </p>

    <h3 className="text-2xl font-bold text-cyan-400">
      ₹{totalTarget}
    </h3>
  </div>

  <div className="bg-slate-900/40 rounded-2xl p-5">
    <p className="text-slate-400">
      Total Saved
    </p>

    <h3 className="text-2xl font-bold text-green-400">
      ₹{totalSaved}
    </h3>
  </div>

  <div className="bg-slate-900/40 rounded-2xl p-5">
    <p className="text-slate-400">
      Goals Completed
    </p>

    <h3 className="text-2xl font-bold text-violet-400">
      {completedGoals}
    </h3>
  </div>

</div>

      <div className="grid grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) =>
            setGoalName(e.target.value)
          }
          className="bg-slate-900/50 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) =>
            setTargetAmount(e.target.value)
          }
          className="bg-slate-900/50 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Saved Amount"
          value={savedAmount}
          onChange={(e) =>
            setSavedAmount(e.target.value)
          }
          className="bg-slate-900/50 p-4 rounded-xl"
        />

      </div>
    <button
  onClick={createGoal}
  className="mt-6 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold"
>
  + Create Goal
</button>
      <div className="mt-8 space-y-4">

  {goals.length === 0 ? (

    <div className="text-slate-400">
      No Goals Created Yet
    </div>

  ) : (

    goals.map((goal) => {

      const progress =
        ((goal.saved / goal.target) * 100).toFixed(0);
      const progressColor =
  Number(progress) < 30
    ? "bg-red-500"
    : Number(progress) < 70
    ? "bg-yellow-500"
    : "bg-green-500";

      return (

        <div
          key={goal.id}
          className="bg-slate-900/40 border border-white/10 rounded-2xl p-6"
        >

        <div className="flex justify-between items-center">

  <h3 className="text-xl font-bold">
    {goal.name}
  </h3>

  <div className="flex items-center gap-4">
    {goal.saved >= goal.target ? (
  <span className="text-yellow-400 font-bold">
    🏆 Completed
  </span>
) : (
  <span className="text-green-400 font-semibold">
    {progress}% Complete
  </span>
)}

    <button
      onClick={() =>
        setGoals(
          goals.filter(
            (g) => g.id !== goal.id
          )
        )
      }
      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
    >
      Delete
    </button>

  </div>

</div>
          <p className="text-slate-400 mt-2">
            ₹{goal.saved} saved of ₹{goal.target}
          </p>

          <div className="w-full h-3 bg-slate-800 rounded-full mt-4">

            <div
              className={`h-3 rounded-full ${progressColor}`}
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      );

    })

  )}

</div>

    </div>
  );
}