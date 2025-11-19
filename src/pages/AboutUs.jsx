import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        About Export Import Hub
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
                        Connecting global traders and facilitating seamless international commerce
                    </p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Mission */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-purple-100 p-4 rounded-full">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 ml-4">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To revolutionize international trade by providing a seamless platform that connects exporters and importers worldwide, 
                            making global commerce accessible, transparent, and efficient for businesses of all sizes.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 ml-4">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To become the world's most trusted and comprehensive export-import marketplace, 
                            empowering millions of businesses to expand globally and fostering sustainable international trade relationships.
                        </p>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Export Import Hub was founded in 2024 with a simple yet powerful vision: to break down barriers in international trade. 
                            We recognized that small and medium-sized businesses often struggle to connect with reliable international partners 
                            and navigate the complexities of global commerce.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Our platform was born from the idea that technology could democratize international trade, 
                            making it as simple as shopping online. Today, we serve thousands of exporters and importers across 50+ countries, 
                            facilitating millions of dollars in trade volume annually.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            We're more than just a marketplace – we're a community of global entrepreneurs, 
                            committed to helping businesses grow beyond borders.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Value 1 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Trust</h3>
                            <p className="text-gray-600">
                                Building reliable relationships through transparency and verified partnerships
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                Leveraging technology to simplify complex trade processes
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Global Reach</h3>
                            <p className="text-gray-600">
                                Connecting businesses across continents and cultures
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
                            <p className="text-gray-600">
                                Maintaining high standards in products and service delivery
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                            <div className="text-gray-200">Products Listed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                            <div className="text-gray-200">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
                            <div className="text-gray-200">Active Traders</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
                            <div className="text-gray-200">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Ready to Start Trading Globally?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of businesses already expanding their reach through our platform
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to='/' className="btn bg-purple-600 hover:bg-purple-700 text-white border-none px-8 py-3 text-lg font-semibold shadow-xl">
                            Get Started Today
                        </Link>
                        <Link to='/contact-us' className="btn btn-outline border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 text-lg font-semibold">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;