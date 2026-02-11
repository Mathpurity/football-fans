import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import StatCard from "../../components/admin/StatCard";
import { getStats } from "../../services/stats";
import Skeleton from "../../components/admin/Skeleton";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      {!stats ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard title="Images" value={stats.images || 0} />
          <StatCard title="Videos" value={stats.videos || 0} />
          <StatCard title="Messages" value={stats.messages || 0} />
        </div>
      )}
    </DashboardLayout>
  );
}
