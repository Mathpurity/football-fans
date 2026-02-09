import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import StatCard from "../../components/admin/StatCard";
import { getStats } from "../../services/stats";
import Skeleton from "../../components/admin/Skeleton";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <DashboardLayout>
      {!stats ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Images" value={stats.images} />
          <StatCard title="Videos" value={stats.videos} />
          <StatCard title="Messages" value={stats.messages} />
        </div>
      )}
    </DashboardLayout>
  );
}
