import React from "react";
import { FaUserPlus, FaSearch, FaExchangeAlt, FaChartLine } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Create Account",
      desc: "Join our ecosystem. Register in seconds as a user or exporter.",
      icon: <FaUserPlus />,
      color: "from-primary to-blue-400",
    },
    {
      id: "02",
      title: "Browse Products",
      desc: "Explore verified global products with advanced filtering.",
      icon: <FaSearch />,
      color: "from-secondary to-pink-400",
    },
    {
      id: "03",
      title: "Import / Export",
      desc: "Connect securely. Manage your shipments via dashboard.",
      icon: <FaExchangeAlt />,
      color: "from-accent to-teal-400",
    },
    {
      id: "04",
      title: "Grow Business",
      desc: "Expand your reach to 50+ countries and scale up.",
      icon: <FaChartLine />,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section className="bg-base-200 py-20 relative overflow-hidden">
      
      {/* 🟢 Background Decoration (Blobs) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-secondary uppercase mb-2 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Works</span>
          </h2>
        </div>

        {/* 🚀 Timeline Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* ➖ Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 border-t-4 border-dotted border-base-300 -z-10 transform translate-y-4"></div>

          {steps.map((s, index) => (
            <div key={s.id} className="group relative flex flex-col items-center text-center">
              
              {/* Step Icon (Squircle Shape) */}
              <div className={`w-24 h-24 mb-6 relative flex items-center justify-center`}>
                 {/* The rotating background shape */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} rounded-[1.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}></div>
                
                {/* The Icon */}
                <div className="relative z-10 text-3xl text-white">
                  {s.icon}
                </div>

                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-base-100 border-2 border-base-200 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-20">
                  {s.id}
                </div>
              </div>

              {/* Card Content */}
              <div className="bg-base-100/60 backdrop-blur-md p-6 rounded-2xl border border-base-300 w-full h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Mobile Connector (Vertical Line) - Visible only on mobile */}
              {index !== steps.length - 1 && (
                 <div className="md:hidden w-1 h-12 border-l-2 border-dotted border-base-300 my-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;