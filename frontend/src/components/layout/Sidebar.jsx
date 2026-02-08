import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-black text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className="block px-4 py-3 rounded hover:bg-gray-800">
          Dashboard
        </NavLink>
        <NavLink to="/admin/images" className="block px-4 py-3 rounded hover:bg-gray-800">
          Images
        </NavLink>
        <NavLink to="/admin/messages" className="block px-4 py-3 rounded hover:bg-gray-800">
          Messages
        </NavLink>
      </nav>
    </aside>
  );
}
