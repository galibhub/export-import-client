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

// Modern Color Palette
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"]; // Indigo, Emerald, Amber, Red

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await fetch(
        "https://export-server-alpha.vercel.app/admin/stats"
      );
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  useEffect(() => {
    loadStats();
    // 🔄 Auto refresh every 5 seconds
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Formatting Data for Charts
  const barData = [
    { name: "Users", value: stats.users, color: "#6366f1" },
    { name: "Products", value: stats.products, color: "#a855f7" },
    { name: "Imports", value: stats.imports, color: "#ec4899" },
  ];

  const pieData = [
    { name: "Approved", value: stats.approvedProducts },
    { name: "Pending", value: stats.pendingProducts },
  ];

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 p-3 shadow-xl rounded-lg border border-base-200 opacity-95">
          <p className="font-bold text-base-content">
            {label || payload[0].name}
          </p>
          <p className="text-primary font-semibold">
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Dashboard Overview
        </h1>
        <p className="text-base-content/60 mt-1">
          Real-time statistics of your platform
        </p>
      </div>

      {/* ===== Stats Cards Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={<FaUsers />}
          color="bg-primary"
          textColor="text-primary"
          subColor="bg-primary/10"
        />
        <StatCard
          title="Total Products"
          value={stats.products}
          icon={<FaBoxOpen />}
          color="bg-secondary"
          textColor="text-secondary"
          subColor="bg-secondary/10"
        />
        <StatCard
          title="Approved"
          value={stats.approvedProducts}
          icon={<FaCheckCircle />}
          color="bg-success"
          textColor="text-success"
          subColor="bg-success/10"
        />
        <StatCard
          title="Pending"
          value={stats.pendingProducts}
          icon={<FaClock />}
          color="bg-warning"
          textColor="text-warning"
          subColor="bg-warning/10"
        />
      </div>

      {/* ===== Charts Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-base-content mb-6">
              Platform Activity
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
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

        {/* Pie Chart Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-base-content mb-6">
              Product Approval Status
            </h2>
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Donut Style
                    outerRadius={100}
                    paddingAngle={5}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === "Approved" ? "#10b981" : "#f59e0b"}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text in Donut */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                <span className="text-3xl font-bold text-base-content">
                  {stats.products}
                </span>
                <p className="text-xs text-base-content/60">Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Modern Stat Card Component
const StatCard = ({ title, value, icon, color, textColor, subColor }) => (
  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 group">
    <div className="card-body p-6 flex flex-row items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wide">
          {title}
        </p>
        <h3 className={`text-3xl font-extrabold mt-1 ${textColor}`}>{value}</h3>
      </div>
      <div
        className={`p-4 rounded-full ${subColor} ${textColor} text-xl group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default AdminDashboardHome;
