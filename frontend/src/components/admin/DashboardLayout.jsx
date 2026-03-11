import { useEffect, useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { clearToken } from "../../utils/auth";
import { getUnreadMessageCount } from "../../services/messages";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  async function handleLogout() {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be logged out of the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      clearToken();
      localStorage.removeItem("user");

      await Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/login", { replace: true });
    }
  }

  const closeSidebar = () => setOpen(false);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const data = await getUnreadMessageCount();
        setUnreadCount(data?.count || 0);
      } catch (error) {
        console.error("Failed to fetch unread message count:", error);
      }
    };

    fetchUnreadCount();

    const interval = setInterval(fetchUnreadCount, 15000); // every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 relative">
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 font-bold text-xl border-b border-gray-700 flex items-center justify-between">
          <span>⚽ Admin Panel</span>

          <button
            onClick={closeSidebar}
            className="md:hidden text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block p-3 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/upload"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block p-3 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Images
          </NavLink>

          <NavLink
            to="/admin/messages"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            <span>Messages</span>

            {unreadCount > 0 && (
              <span className="min-w-[24px] h-6 px-2 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full text-left p-3 rounded-lg bg-red-500 hover:bg-red-600 transition mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-gray-700 dark:text-white"
            aria-label="Open sidebar"
          >
            ☰
          </button>

          <h1 className="font-semibold text-gray-700 dark:text-white">
            Admin Dashboard
          </h1>
        </header>

        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}