export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center">

      <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-5xl shadow-2xl">
        💼
      </div>

      <h1 className="text-5xl font-black mt-8">
        FinPilot AI
      </h1>

      <p className="text-slate-400 mt-3">
        Initializing Smart Finance Dashboard...
      </p>

      <div className="w-80 h-3 bg-slate-800 rounded-full mt-10 overflow-hidden">

        <div className="h-3 bg-gradient-to-r from-violet-500 to-cyan-400 animate-pulse w-full"></div>

      </div>

    </div>
  );
}