import React from 'react';

const LatestProduct = ({product}) => {
    const {productName,productImage,price,originCountry,rating,availableQuantity}=product;
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
  {/* Image Section */}
  <figure className="px-4 pt-4 relative overflow-hidden group">
    <img
      src={productImage}
      alt={productName}
      className="rounded-xl w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
    />
    {/* Rating Badge */}
    <div className="absolute top-6 right-6 bg-yellow-400 text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg">
      ⭐ {rating}
    </div>
    {/* Stock Badge */}
    {availableQuantity < 10 && (
      <div className="absolute top-6 left-6 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-xs shadow-lg">
        Only {availableQuantity} left!
      </div>
    )}
  </figure>
  
  {/* Content Section */}
  <div className="card-body flex-grow p-6">
    {/* Title */}
    <h2 className="card-title text-xl font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
      {productName}
    </h2>
    
    {/* Info Grid */}
    <div className="space-y-3 my-4">
      {/* Price */}
      <div className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg">
        <span className="text-gray-600 font-medium">Price</span>
        <span className="text-2xl font-bold text-primary">${price}</span>
      </div>
      
      {/* Origin & Stock */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-500 mb-1">Origin</p>
          <p className="font-semibold text-gray-700 text-sm">{originCountry}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-500 mb-1">Stock</p>
          <p className="font-semibold text-gray-700 text-sm">{availableQuantity} units</p>
        </div>
      </div>
    </div>
    
    {/* Button */}
    <div className="card-actions w-full mt-auto">
      <button className="btn btn-primary w-full hover:scale-105 transition-transform duration-200 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        See Details
      </button>
    </div>
  </div>
</div>
    );
};

export default LatestProduct;