import { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../../Provider/AuthProvider";

const UserDashboardHome = () => {
  const { user ,loading: authLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    exports: 0,
    imports: 0,
  });

  const [chartData, setChartData] = useState([]);

  
if (authLoading) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}


useEffect(() => {
  if (authLoading) return;

  if (!user?.email) {
    setLoading(false);
    return;
  }

  const loadData = async () => {
    try {
      setLoading(true);

      const [exportRes, importRes] = await Promise.all([
        fetch(`https://export-server-alpha.vercel.app/myExport?email=${user.email}`),
        fetch(`https://export-server-alpha.vercel.app/myImport?email=${user.email}`),
      ]);

      const exportData = await exportRes.json();
      const importData = await importRes.json();

      const exportCount = exportData?.result?.length || 0;
      const importCount = importData?.length || 0;

      setStats({ exports: exportCount, imports: importCount });

      setChartData([
        { name: "Exports", value: exportCount, fill: "#6366f1" },
        { name: "Imports", value: importCount, fill: "#ec4899" },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setStats({ exports: 0, imports: 0 });
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [user?.email, authLoading]);


  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-300 p-3 rounded-lg shadow-lg border border-base-200">
          <p className="font-bold text-sm">{label}</p>
          <p className="text-primary text-sm">
            Count: <span className="font-mono">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back, {user?.displayName?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="text-base-content/70 mt-1">
            Here is what's happening with your shipments today.
          </p>
        </div>
        <div className="text-sm breadcrumbs hidden md:block">
          <ul>
            <li>Dashboard</li>
            <li>Overview</li>
          </ul>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-primary hover:scale-[1.01] transition-transform">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-base-content/60 text-sm uppercase tracking-wide">
                Total Exports
              </h2>
              <p className="text-4xl font-extrabold mt-2">{stats.exports}</p>
              <p className="text-xs text-success mt-1">↗ Lifetime total</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              {/* Box Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Import Card */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-secondary hover:scale-[1.01] transition-transform">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-base-content/60 text-sm uppercase tracking-wide">
                Total Imports
              </h2>
              <p className="text-4xl font-extrabold mt-2">{stats.imports}</p>
              <p className="text-xs text-info mt-1">↘ Lifetime total</p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-full text-secondary">
              {/* Truck Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Comparison Overview
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                  vertical={false}
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AREA CHART (Activity Trend - Mock Data) */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-secondary rounded-full"></span>
            Estimated Growth
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  {
                    month: "Jan",
                    activity: Math.floor(stats.exports * 0.2) + 2,
                  },
                  {
                    month: "Feb",
                    activity: Math.floor(stats.exports * 0.4) + 5,
                  },
                  {
                    month: "Mar",
                    activity: Math.floor(stats.exports * 0.6) + 3,
                  },
                  { month: "Apr", activity: stats.exports + stats.imports },
                ]}
              >
                <defs>
                  <linearGradient
                    id="colorActivity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                  vertical={false}
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="activity"
                  stroke="#ec4899"
                  fillOpacity={1}
                  fill="url(#colorActivity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
