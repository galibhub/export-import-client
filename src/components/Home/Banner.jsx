import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="hero bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 min-h-[500px] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="hero-content flex-col lg:flex-row w-full max-w-7xl px-4 py-12 relative z-10">
                
                {/* Left Side - Text Content */}
                <div className="lg:w-1/2 text-white space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Welcome to <br />
                        <span className="text-yellow-300">Export Import Hub</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-100 max-w-xl">
                        Explore thousands of products, discover hidden gems, and connect with global trade opportunities.
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to='/allProducts' className="btn bg-white text-purple-600 hover:bg-gray-100 border-none px-8 py-3 text-lg font-semibold shadow-xl">
                            All Products
                        </Link>
                        <Link to="/addExport" className="btn btn-outline text-white border-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold">
                            Add Export
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 pt-8">
                        <div>
                            <h3 className="text-3xl font-bold text-yellow-300">500+</h3>
                            <p className="text-gray-200">Products</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-yellow-300">50+</h3>
                            <p className="text-gray-200">Countries</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-yellow-300">1000+</h3>
                            <p className="text-gray-200">Exporters</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image/Illustration */}
                <div className="lg:w-1/2">
                    <div className="relative">
                        {/* Main Image Card */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                            <img
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=600&fit=crop"
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                                alt="Export Import"
                            />
                        </div>

                        {/* Floating Badge 1 */}
                        <div className="absolute -top-4 -left-4 bg-yellow-400 text-gray-800 px-6 py-3 rounded-2xl shadow-xl font-bold animate-bounce">
                            🌍 Global Trade
                        </div>

                        {/* Floating Badge 2 */}
                        <div className="absolute -bottom-4 -right-4 bg-white text-purple-600 px-6 py-3 rounded-2xl shadow-xl font-bold animate-pulse">
                            ✨ Quality Products
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;