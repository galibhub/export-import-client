import React from "react";
import { FaUserCheck, FaShieldAlt, FaGlobeAmericas, FaCogs } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Verified Exporters",
      desc: "Trade with confidence. We strictly verify every exporter to ensure a safe and trusted global marketplace.",
      icon: <FaUserCheck />,
      color: "from-blue-500 to-cyan-400", // Individual gradient for variety within 3-color rule
    },
    {
      id: 2,
      title: "Secure Transactions",
      desc: "Your security is paramount. We utilize Firebase authentication and role-based access control.",
      icon: <FaShieldAlt />,
      color: "from-emerald-500 to-green-400",
    },
    {
      id: 3,
      title: "Global Reach",
      desc: "Expand your horizon. Connect seamlessly with businesses and logistics partners across 50+ countries.",
      icon: <FaGlobeAmericas />,
      color: "from-purple-500 to-indigo-400",
    },
    {
      id: 4,
      title: "Easy Management",
      desc: "All-in-one control. Manage your imports, exports, and analytics from a single, intuitive dashboard.",
      icon: <FaCogs />,
      color: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      
      {/* 🎨 Ultra Shape: Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest text-secondary uppercase mb-2 block">
            Excellence in Trade
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-base-content">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ExportHub?</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            We bridge the gap between global traders with technology that ensures security, speed, and reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group relative bg-base-200/50 backdrop-blur-sm p-8 rounded-[2rem] border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${item.color} transition-opacity duration-500`}></div>

              {/* Icon Container with "Ultra Shape" (Squircle) */}
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6`}>
                {item.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative Number in background */}
              <div className="absolute -bottom-4 -right-4 text-8xl font-black text-base-content/5 opacity-0 group-hover:opacity-10 transition-all duration-500 select-none">
                0{item.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;