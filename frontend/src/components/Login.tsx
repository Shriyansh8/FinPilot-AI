import { useState } from "react";
import {
  FaChartPie,
  FaRobot,
  FaBullseye
} from "react-icons/fa";

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();
  if (response.ok) {

  localStorage.setItem(
    "loggedIn",
    "true"
  );

  localStorage.setItem(
    "userName",
    data.user.name
  );

  localStorage.setItem(
    "userId",
    data.user.id.toString()
  );

  onLogin();
}
else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to server"
      );
    }
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-6">

    <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center relative">
        <div className="mb-12 z-10">

  <div className="flex items-center gap-4">

    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center text-3xl">
      💼
    </div>

    <div>

      <h2 className="text-4xl font-black text-white">
        FinPilot AI
      </h2>

      <p className="text-slate-400">
        Smart Finance Companion
      </p>

    </div>

  </div>

</div>

  <div className="absolute -top-10 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl"></div>

  <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
  <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight z-10">

  Manage Money
  <br />

  <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
    Like a Pro
  </span>

</h1>

  <p className="text-slate-400 text-xl mt-6 max-w-lg z-10">
    Join thousands of smart users who manage finances with AI-powered insights.
  </p>

  <div className="space-y-5 mt-10 z-10 max-w-xl">

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl flex gap-4 items-center hover:scale-[1.02] transition duration-300">
      <FaChartPie className="text-violet-400 text-3xl" />
      <div>
        <h3 className="font-bold">
          Smart Expense Tracking
        </h3>
        <p className="text-slate-400 text-sm">
          Track every rupee with ease.
        </p>
      </div>
    </div>

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl flex gap-4 items-center hover:scale-[1.02] transition duration-300">
      <FaRobot className="text-cyan-400 text-3xl" />
      <div>
        <h3 className="font-bold">
          AI Financial Advisor
        </h3>
        <p className="text-slate-400 text-sm">
          Personalized recommendations.
        </p>
      </div>
    </div>

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl flex gap-4 items-center hover:scale-[1.02] transition duration-300">
      <FaBullseye className="text-pink-400 text-3xl" />
      <div>
        <h3 className="font-bold">
          Savings Goals
        </h3>
        <p className="text-slate-400 text-sm">
          Achieve financial milestones.
        </p>
      </div>
    </div>

  </div>

</div>

      {/* Login Card */}

      <form
        onSubmit={handleLogin}
    className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-lg w-full"      >
      <div className="flex justify-end mb-4">

  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm">
    🔒 Secure & Trusted
  </div>

</div>

        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-400 mb-2">
Login to continue managing your finances
</p>

<p className="text-slate-500 text-sm mb-8">
Trusted by hundreds of users for smarter financial decisions.
</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-slate-900/60 text-white border border-white/10"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl bg-slate-900/60 text-white border border-white/10"
          required
        />
        <div className="flex justify-between items-center mb-6">

  <label className="flex items-center gap-2 text-slate-400 text-sm">

    <input type="checkbox" />

    Remember Me

  </label>

  <button
    type="button"
    className="text-cyan-400 text-sm"
  >
    Forgot Password?
  </button>

</div>

<button
  type="submit" className="w-full bg-gradient-to-r from-violet-600 to-blue-600 py-4 rounded-xl font-semibold text-white hover:scale-[1.02] transition">
  Login
</button>
<p className="text-slate-400 text-center mt-6">
Don't have an account?
<button
type="button"
onClick={onSwitchToRegister}
className="text-cyan-400 ml-2">
Register
</button>
</p>
</form>
</div>
</div>
);
}

export default Login;