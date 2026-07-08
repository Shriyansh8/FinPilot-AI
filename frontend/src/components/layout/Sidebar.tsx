import {
  LayoutDashboard,
  Target,
  FileText,
  Settings,
  LogOut,
  User,
} from "lucide-react";

const Sidebar = ({
  handleLogout,
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}: any) => {
  return (
<>
<div
  className={`
    fixed left-0 top-0 h-screen w-72
    bg-slate-950/95 backdrop-blur-xl
    border-r border-white/10 p-6
    z-50
    transition-transform duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
  `}
>

      <h1 className="text-3xl font-black text-white mb-12">
        FinPilot AI
      </h1>
      <button
  className="lg:hidden absolute top-6 right-6 text-white text-xl"
  onClick={() => setSidebarOpen(false)}
>
  ✕
</button>

      <div className="space-y-4">

      <button
  onClick={() => setActivePage("dashboard")}
  className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${
    activePage === "dashboard"
      ? "bg-white/10 border border-white/20"
      : "hover:bg-white/10"
  }`}
>
  <LayoutDashboard size={20} />
  Dashboard
</button>

        <button
  onClick={() => setActivePage("reports")}
  className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${
    activePage === "reports"
      ? "bg-white/10 border border-white/20"
      : "hover:bg-white/10"
  }`}
>
  <FileText size={20} />
  Reports
</button>

        <button
  onClick={() => setActivePage("goals")}
  className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${
    activePage === "goals"
      ? "bg-white/10 border border-white/20"
      : "hover:bg-white/10"
  }`}
>
  <Target size={20} />
  Goals
</button>
 <button
  onClick={() => setActivePage("settings")}
  className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${
    activePage === "settings"
      ? "bg-white/10 border border-white/20"
      : "hover:bg-white/10"
  }`}
>
  <Settings size={20} />
  Settings
</button>
<button
  onClick={() => setActivePage("profile")}
  className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${
    activePage === "profile"
      ? "bg-white/10 border border-white/20"
      : "hover:bg-white/10"
  }`}
>
  <User size={20} />
  Profile
</button>

      </div>
      <button onClick={handleLogout} className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition p-4 rounded-xl">
        <LogOut size={20} />
        Logout
      </button>

    </div>
    {sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 lg:hidden z-40"
    onClick={() => setSidebarOpen(false)}
  />
)}

</>
  );
};

export default Sidebar;