import { FaWallet, FaBars } from "react-icons/fa";

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  setSidebarOpen,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <button
            className="lg:hidden text-white text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
            <FaWallet size={24} />
          </div>

          <div>

            <h1 className="text-xl md:text-2xl font-bold text-white">
              FinPilot AI
            </h1>

            <p className="text-xs text-gray-400">
              Smart Finance Companion
            </p>

          </div>

        </div>

      </div>

    </nav>
  );
}