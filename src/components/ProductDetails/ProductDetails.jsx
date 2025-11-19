import React from 'react';
import { useLoaderData } from 'react-router-dom'; // ✅ -dom add করুন

const ProductDetails = () => {
    const data = useLoaderData();
    const product = data.result;
    console.log(product);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Modern Header Section */}
            <div className="bg-gradient-to-r from-purple-600 via-yellow-500 to-indigo-700 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        Product Details
                    </h1>
                    
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Discover everything you need to know about this amazing product
                    </p>
                </div>
            </div>

            {/* Product Content */}
            <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 -mt-8 relative z-10">
                <div className="card bg-base-100 shadow-2xl border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
                        {/* Product Image */}
                        <div className="shrink-0 w-full md:w-1/2">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-96 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                {product.productName}
                            </h2>

                            <div className="flex gap-3">
                                <div className="badge badge-lg badge-outline text-purple-600 border-purple-600 font-medium">
                                    📍 {product.originCountry}
                                </div>

                                <div className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
                                    ⭐ {product.rating}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                                    <span className="font-semibold text-gray-700">Price:</span>
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                        ${product.price}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                                    <span className="font-semibold text-gray-700">Available Stock:</span>
                                    <span className="text-xl font-bold text-green-600">
                                        {product.availableQuantity} 
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button className="btn bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700 rounded-full w-full shadow-lg hover:shadow-xl transition-all duration-300">
                                    🚀 Import Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;