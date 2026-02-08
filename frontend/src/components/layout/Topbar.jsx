import useTheme from "../../hooks/useTheme";
import { logout } from "../../utils/auth";

export default function Topbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 text-black dark:text-white shadow flex items-center justify-between px-4 md:px-6">
      <h1 className="font-semibold text-lg">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
