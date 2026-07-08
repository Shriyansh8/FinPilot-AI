import { useState } from "react";
interface RegisterProps {
  onSwitchToLogin: () => void;
}

function Register({ onSwitchToLogin }: RegisterProps) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      const response =
        await fetch(
  `${import.meta.env.VITE_API_URL}/register`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      alert(data.message);
    };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-6">

    <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

      {/* Left Side */}

      <div className="hidden md:block">

        <h1 className="text-6xl font-black text-white">
          FinPilot AI
        </h1>

        <p className="text-slate-400 text-xl mt-4 mb-10">
          Smart Finance Companion
        </p>

        <div className="space-y-5">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            📊 Track Expenses & Budgets
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            🤖 AI Powered Financial Insights
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            🎯 Savings Goals & Smart Planning
          </div>

        </div>

      </div>

      {/* Register Card */}

      <form
        onSubmit={handleRegister}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-white mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 mb-8">
          Join FinPilot AI today
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-900/60 border border-white/10 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-900/60 border border-white/10 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 mb-6 rounded-xl bg-slate-900/60 border border-white/10 text-white"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 py-4 rounded-xl text-white font-semibold hover:scale-[1.02] transition"
        >
          Register
        </button>

        <p className="text-center text-slate-400 mt-6">

          Already have an account?

          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-cyan-400 ml-2"
          >
            Login
          </button>

        </p>

      </form>

    </div>

  </div>
);
}

export default Register;