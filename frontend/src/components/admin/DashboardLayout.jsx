import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 bg-black text-white h-full transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform`}
      >
        <div className="p-5 font-bold text-xl border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to="/admin/dashboard" className="block hover:bg-gray-800 p-2 rounded">
            Dashboard
          </NavLink>
          <NavLink to="/admin/images" className="block hover:bg-gray-800 p-2 rounded">
            Images
          </NavLink>
          <NavLink to="/admin/messages" className="block hover:bg-gray-800 p-2 rounded">
            Messages
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden mr-3 text-xl"
          >
            ☰
          </button>
          <h1 className="font-semibold">Dashboard</h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
