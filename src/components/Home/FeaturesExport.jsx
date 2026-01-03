import React from 'react';
import { Link } from 'react-router-dom'; 

const FeaturedExport = () => {
  return (
    
    <section className="max-w-8xl mx-auto px-5 py-16">
      
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl shadow-xl overflow-hidden border border-white/20">
        <div className="flex flex-col lg:flex-row items-center gap-10 p-8 md:p-12 lg:p-16">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <figure className="rounded-2xl overflow-hidden shadow-lg relative group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                alt="Featured Export Product"
                className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </figure>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                Premium Industrial Machinery
              </h3>
              <p className="text-sm font-medium text-secondary tracking-widest uppercase">
                Featured by Export Hub
              </p>
            </div>

            <p className="text-base md:text-lg text-base-content/70 leading-relaxed">
              Discover our premium industrial machinery designed for global markets. 
              With cutting-edge technology and superior performance, our products empower 
              businesses to achieve operational excellence and sustainable growth worldwide.
            </p>

            <div className="pt-2">
              <Link 
                to='/allProducts' 
                className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Now ➜
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedExport;