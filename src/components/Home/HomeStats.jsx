import React from "react";
import CountUp from "react-countup";
import { FaBoxOpen, FaGlobe, FaUserTie, FaCheckCircle } from "react-icons/fa";

const HomeStats = () => {
  const stats = [
    {
      id: 1,
      icon: <FaBoxOpen />,
      count: 500,
      suffix: "+",
      label: "Products Listed",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      id: 2,
      icon: <FaGlobe />,
      count: 50,
      suffix: "+",
      label: "Countries Served",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/20",
    },
    {
      id: 3,
      icon: <FaUserTie />,
      count: 1000,
      suffix: "+",
      label: "Active Exporters",
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
    },
    {
      id: 4,
      icon: <FaCheckCircle />,
      count: 99,
      suffix: "%",
      label: "Success Rate",
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Container for stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((item) => (
            <div
              key={item.id}
              className={`relative group p-6 rounded-[2rem] border ${item.border} bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
            >
              {/* 🎨 Ultra Shape: Background Skewed Decoration */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${item.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className={`w-14 h-14 mb-4 rounded-full flex items-center justify-center text-2xl ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>

                {/* Animated Number */}
                <h2 className={`text-4xl md:text-5xl font-black ${item.color} mb-1 font-mono tracking-tight`}>
                  <CountUp end={item.count} duration={2.5} enableScrollSpy />
                  <span className="text-3xl ml-1">{item.suffix}</span>
                </h2>

                {/* Label */}
                <p className="text-base-content/70 font-medium text-sm md:text-base uppercase tracking-wider mt-2">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;