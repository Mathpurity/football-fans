import { NavLink } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 h-full bg-white dark:bg-gray-800 shadow
        transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="p-6 font-bold text-xl dark:text-white">
          Admin Panel
        </div>

        <nav className="space-y-2 px-4">
          <NavLink to="/admin/dashboard" onClick={onClose}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/images" onClick={onClose}>
            Images
          </NavLink>
          <NavLink to="/admin/messages" onClick={onClose}>
            Messages
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
