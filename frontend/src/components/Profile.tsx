export default function Profile() {

  const userName =
    localStorage.getItem("userName") ||
    "User";

  const totalExpenses =
    localStorage.getItem(
      "totalExpenses"
    ) || "0";

    return (

<div className="space-y-8">

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

    <div className="flex flex-col md:flex-row items-center justify-between">

      <div className="flex items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-5xl font-black shadow-[0_0_40px_rgba(59,130,246,0.4)]">
          {userName.charAt(0).toUpperCase()}

        </div>

        <div>

          <h2 className="text-4xl font-black">

            {userName}

          </h2>

          <p className="text-slate-400 mt-2">

            FinPilot AI Premium User

          </p>

          <div className="mt-4">

            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">

              ● Active Account

            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <p className="text-slate-400">

        Total Expenses

      </p>

      <h3 className="text-4xl font-bold text-cyan-400 mt-3">

        ₹{totalExpenses}

      </h3>

    </div>

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300">

      <p className="text-slate-400">

        Account Status

      </p>

      <h3 className="text-4xl font-bold text-green-400 mt-3">

        Active

      </h3>

    </div>

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300">

      <p className="text-slate-400">

        Member Since

      </p>

      <h3 className="text-2xl font-bold text-violet-400 mt-3">

        2025

      </h3>

    </div>

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300">

      <p className="text-slate-400">

        User ID

      </p>

      <h3 className="text-xl font-bold text-yellow-400 mt-3">

        #{localStorage.getItem("userId")}

      </h3>

    </div>

  </div>

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">

    <h2 className="text-2xl font-bold mb-6">

      Financial Level

    </h2>

    <div className="flex items-center gap-4">

      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

        <div
          className="h-4 bg-gradient-to-r from-violet-500 to-cyan-500"
          style={{
            width:
              Number(totalExpenses) > 10000
                ? "100%"
                : Number(totalExpenses) > 5000
                ? "70%"
                : "40%",
          }}
        />

      </div>

      <span className="font-bold text-cyan-400">

        {Number(totalExpenses) > 10000
          ? "Gold"
          : Number(totalExpenses) > 5000
          ? "Silver"
          : "Bronze"}

      </span>

    </div>

  </div>

  <div className="flex gap-4">

    <button className="bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">

      Edit Profile

    </button>

    <button className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold">

      Change Password

    </button>

  </div>

</div>

);
  

}