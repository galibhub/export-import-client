import React from 'react';
import { Link } from 'react-router';

const FeaturedExport = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          
          {/* Image Section */}
          <div className="md:w-1/2 w-full">
            <figure className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                alt="Featured Export Product"
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </figure>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 w-full space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary">
              Premium Industrial Machinery
            </h3>
            <p className="text-sm italic text-base-content/60">
              by Export Import Hub Team
            </p>
            <p className="text-base md:text-lg text-base-content/80 leading-relaxed">
              Discover our premium industrial machinery designed for global markets. 
              With cutting-edge technology and superior performance, our products empower 
              businesses to achieve operational excellence and sustainable growth worldwide.
            </p>
            <div className="pt-4">
              <Link to='allProducts' className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedExport;