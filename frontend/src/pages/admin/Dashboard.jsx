import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import StatCard from "../../components/admin/StatCard";
import Skeleton from "../../components/admin/Skeleton";
import { getStats } from "../../services/stats";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError(true);
        setStats({ images: 0, videos: 0, messages: 0 });
      }
    }

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Monitor platform activity.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            Failed to load stats — showing defaults.
          </div>
        )}

        {!stats ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard title="Images" value={stats?.images} />
            <StatCard title="Videos" value={stats?.videos} />
            <StatCard title="Messages" value={stats?.messages} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
