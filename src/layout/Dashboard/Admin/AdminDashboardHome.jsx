


import { useEffect, useState } from "react";
import { FaBoxOpen, FaCheckCircle, FaClock, FaUsers } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await fetch("https://export-server-alpha.vercel.app/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 10000); // 10s refresh is safer
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const barData = [
    { name: "Users", value: stats.users || 0, color: "#6366f1" },
    { name: "Products", value: stats.products || 0, color: "#a855f7" },
    { name: "Imports", value: stats.imports || 0, color: "#ec4899" },
  ];

  const pieData = [
    { name: "Approved", value: stats.approvedProducts || 0 },
    { name: "Pending", value: stats.pendingProducts || 0 },
  ];

  return (
    <div className="space-y-8 p-1">
      <div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Dashboard Overview
        </h1>
        <p className="text-base-content/60 mt-1">Real-time statistics of your platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.users} icon={<FaUsers />} color="bg-primary" textColor="text-primary" subColor="bg-primary/10" />
        <StatCard title="Total Products" value={stats.products} icon={<FaBoxOpen />} color="bg-secondary" textColor="text-secondary" subColor="bg-secondary/10" />
        <StatCard title="Approved" value={stats.approvedProducts} icon={<FaCheckCircle />} color="bg-success" textColor="text-success" subColor="bg-success/10" />
        <StatCard title="Pending" value={stats.pendingProducts} icon={<FaClock />} color="bg-warning" textColor="text-warning" subColor="bg-warning/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-base-content mb-6">Platform Activity</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-base-content mb-6">Approval Status</h2>
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === "Approved" ? "#10b981" : "#f59e0b"} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, textColor, subColor }) => (
  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 group">
    <div className="card-body p-6 flex flex-row items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wide">{title}</p>
        <h3 className={`text-3xl font-extrabold mt-1 ${textColor}`}>{value || 0}</h3>
      </div>
      <div className={`p-4 rounded-full ${subColor} ${textColor} text-xl group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
    </div>
  </div>
);

export default AdminDashboardHome;
