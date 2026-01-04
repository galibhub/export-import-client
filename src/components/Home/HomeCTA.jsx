import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaArrowRight, FaGlobeAmericas } from "react-icons/fa";

const HomeCTA = () => {
  return (
    <section className="py-24 bg-base-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 🎨 Ultra-Shape Container */}
        <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary rounded-[3rem] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
          
          {/* Background Decorative Rings */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          {/* Floating Icon Background (Visual interest) */}
          <FaGlobeAmericas className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] text-white/5 animate-pulse z-[-1]" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1 text-white text-sm font-bold mb-6 shadow-lg">
              <FaRocket className="text-yellow-300" />
              <span>Join 5,000+ Global Traders</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-sm">
              Ready to Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Global Journey?
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              Connect with verified exporters, manage shipments securely, and scale your business across 50+ countries today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register" 
                className="btn btn-lg bg-white text-primary border-none hover:bg-gray-100 hover:scale-105 transition-all duration-300 rounded-2xl px-8 shadow-xl flex items-center gap-2 font-bold"
              >
                Get Started Now <FaArrowRight />
              </Link>
              
              <Link 
                to="/allProducts" 
                className="btn btn-lg btn-outline text-white border-white/40 hover:bg-white/10 hover:border-white hover:text-white rounded-2xl px-8"
              >
                Browse Market
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;