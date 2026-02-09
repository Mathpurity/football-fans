import DarkModeToggle from "../DarkModeToggle";

export default function Topbar() {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      <h1 className="font-semibold dark:text-white">Dashboard</h1>
      <DarkModeToggle />
    </header>
  );
}
