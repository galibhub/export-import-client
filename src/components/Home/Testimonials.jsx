import React from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "John Smith",
      role: "Exporter, USA",
      msg: "ExportHub made global trade extremely easy and secure. The dashboard is intuitive and verification gave me peace of mind.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahim Ahmed",
      role: "Importer, Bangladesh",
      msg: "Excellent platform with smooth import management. I found reliable suppliers for my electronics business within days.",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Maria Lopez",
      role: "Distributor, Spain",
      msg: "Professional UI and reliable exporters. The real-time tracking features helped us optimize our supply chain significantly.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      
      {/* 🟢 Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-2 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clients Say</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="relative bg-base-100 p-8 rounded-[2.5rem] rounded-tl-none shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              
              {/* Giant Quote Icon Background */}
              <div className="absolute top-6 right-8 text-6xl text-base-content/5 group-hover:text-primary/10 transition-colors duration-300">
                <FaQuoteRight />
              </div>

              {/* ⭐ Stars */}
              <div className="flex gap-1 text-warning text-sm mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < r.rating ? "opacity-100" : "opacity-30"} />
                ))}
              </div>

              {/* Message */}
              <p className="text-base-content/80 text-lg leading-relaxed mb-8 italic relative z-10">
                "{r.msg}"
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                {/* Avatar with Ring */}
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-r from-primary to-secondary">
                  <img 
                    src={r.img} 
                    alt={r.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-base-100"
                  />
                </div>
                
                {/* Info */}
                <div>
                  <h4 className="font-bold text-lg">{r.name}</h4>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {r.role}
                  </p>
                </div>
              </div>

              {/* 🎨 Ultra Shape: Bottom colored bar */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;