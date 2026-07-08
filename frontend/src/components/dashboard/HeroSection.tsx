export default function HeroSection() {
  return (
  <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 mb-6"> 
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-transparent to-cyan-500/20" />

      <div className="relative z-10">

        <p className="uppercase tracking-[0.4em] text-violet-400 mb-4">
          FINPILOT AI
        </p>

        <h1 className="text-4xl font-black leading-tight">
        AI Powered
        <br />
        Expense Tracking
        </h1>

        <p className="text-slate-400 text-lg mt-6 max-w-2xl">
          Track expenses, analyze spending habits,
          receive AI-powered recommendations and
          build long-term wealth intelligently.
        </p>

      </div>
    </section>
  );
}