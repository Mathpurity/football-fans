import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Spinner from "../../components/ui/Spinner";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`)
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <Spinner />;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Images" value={stats.images} />
        <StatCard title="Messages" value={stats.messages} />
        <StatCard title="Videos" value={stats.videos} />
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded p-6 shadow">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
