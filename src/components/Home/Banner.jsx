import React from 'react';
import { AiOutlineGlobal, AiOutlineRocket } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="relative min-h-[600px] overflow-hidden bg-base-100 flex items-center">
            
            {/* 🎨 Colorful Background Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500">
                {/* Animated Blobs */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400 rounded-full blur-[120px] opacity-30"></div>
                
                {/* Grid Pattern Overlay for Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-7xl mx-auto px-6 py-16 relative z-10 gap-12 lg:gap-20">
                
                {/* 🖼️ Right Side: Image with Ultra Shape */}
                <div className="lg:w-1/2 relative group">
                    <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                        {/* Glass Container */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-4 shadow-2xl border border-white/20 relative">
                            <img
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
                                className="rounded-[2.5rem] shadow-lg w-full h-auto object-cover aspect-[4/3]"
                                alt="Global Trade"
                            />
                            
                            {/* Floating Badge 1 */}
                            <div className="absolute -top-6 -left-6 bg-white text-violet-700 px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2 animate-bounce">
                                <AiOutlineGlobal className="text-2xl text-pink-500" />
                                <span>Global Reach</span>
                            </div>

                            {/* Floating Badge 2 */}
                            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2 animate-pulse">
                                <AiOutlineRocket className="text-2xl" />
                                <span>Fast Shipping</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Blob behind image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[3rem] blur-xl opacity-40 transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
                </div>

                {/* 📝 Left Side: Text Content */}
                <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left">
                    
                    {/* Eyebrow Text */}
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold tracking-widest uppercase">
                      The Future of Trade
                    </span>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-sm">
                        Welcome to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-white">
                            ExportHub
                        </span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                        Discover a world of opportunities. Connect with verified exporters, browse exclusive products, and expand your business globally with ease.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start pt-2">
                        <Link
                            to="/allProducts"
                            className="btn btn-lg bg-white text-violet-700 hover:bg-gray-100 border-none px-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.8)] transition-all transform hover:-translate-y-1"
                        >
                            Explore Market
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;