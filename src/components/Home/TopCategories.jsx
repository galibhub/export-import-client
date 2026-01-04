import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMicrochip, FaLeaf, FaTshirt, FaCogs } from "react-icons/fa";

const TopCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Electronics",
      desc: "Gadgets, Circuits & More",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
      icon: <FaMicrochip />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      title: "Agriculture",
      desc: "Organic & Fresh Produce",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
      icon: <FaLeaf />,
      color: "from-emerald-500 to-green-400",
    },
    {
      id: 3,
      title: "Textiles",
      desc: "Fabrics, Fashion & Yarn",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=80",
      icon: <FaTshirt />,
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 4,
      title: "Machinery",
      desc: "Industrial & Heavy Tools",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      icon: <FaCogs />,
      color: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <section className="py-20 bg-base-100 relative overflow-hidden">
       {/* Background Decorative Blob */}
       <div className="absolute right-0 top-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-2 block">
            Browse by Sector
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Top Export <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Categories</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              to={`/category/${cat.title.toLowerCase()}`} 
              key={cat.id} 
              className="group relative h-[400px] w-full block overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              
              {/* Background Image with Zoom Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>

              {/* Gradient Overlay (Always visible but gets darker on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Floating Icon (The "Ultra Shape" Element) */}
              <div className={`absolute top-6 right-6 w-14 h-14 bg-gradient-to-br ${cat.color} backdrop-blur-md rounded-2xl rotate-12 flex items-center justify-center text-white text-2xl shadow-lg group-hover:rotate-0 transition-all duration-500`}>
                {cat.icon}
              </div>

              {/* Content Positioned at Bottom */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Decoration Line */}
                <div className={`w-12 h-1.5 bg-gradient-to-r ${cat.color} rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100`}></div>

                <h3 className="text-2xl font-bold text-white mb-1 group-hover:mb-2 transition-all">
                  {cat.title}
                </h3>
                
                <p className="text-gray-300 text-sm opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 delay-100 mb-4">
                  {cat.desc}
                </p>

                {/* Explore Button */}
                <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:text-primary transition-colors">
                  Explore Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;