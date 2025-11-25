import React from "react";
import { Link } from "react-router-dom";


const TopCategories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
        Top Export Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Electronics */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
          <figure className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80"
              alt="Electronics"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h3 className="card-title text-xl font-bold text-base-content">
              Electronics
            </h3>
          </div>
        </div>

        {/* Agriculture */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
          <figure className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80"
              alt="Agriculture"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h3 className="card-title text-xl font-bold text-base-content">
              Agriculture
            </h3>
          </div>
        </div>

        {/* Textiles */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
          <figure className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=400&q=80"
              alt="Textiles"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h3 className="card-title text-xl font-bold text-base-content">
              Textiles
            </h3>
          </div>
        </div>

        {/* Machinery */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
          <figure className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80"
              alt="Machinery"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h3 className="card-title text-xl font-bold text-base-content">
              Machinery
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopCategories;