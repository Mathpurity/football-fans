import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 font-bold text-xl border-b border-gray-700">
          ⚽ Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to="/admin/dashboard" className="block p-3 rounded-lg hover:bg-gray-800">
            Dashboard
          </NavLink>

          <NavLink to="/admin/images" className="block p-3 rounded-lg hover:bg-gray-800">
            Images
          </NavLink>

          <NavLink to="/admin/messages" className="block p-3 rounded-lg hover:bg-gray-800">
            Messages
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full text-left p-3 rounded-lg bg-red-500 hover:bg-red-600 transition mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-64">

        <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl"
          >
            ☰
          </button>

          <h1 className="font-semibold text-gray-700 dark:text-white">
            Admin Dashboard
          </h1>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}
