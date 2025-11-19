import React from 'react';
import { Link } from 'react-router';

const MyExportCard = ({ product, index }) => {
    const {_id}=product;
    return (
        <tr className="hover:bg-gray-50 transition-colors duration-200">
            {/* Serial Number */}
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {index + 1}
            </td>

            {/* Product Title with Image */}
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <img 
                        src={product.productImage} 
                        alt={product.productName}
                        className="h-10 w-10 rounded object-cover mr-3 border-2 border-gray-200"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                        }}
                    />
                    <span className="text-sm font-medium text-gray-900 underline hover:text-purple-600">
                        {product.productName}
                    </span>
                </div>
            </td>

            {/* Author (Exporter Name) */}
            <td className="px-6 py-4 text-sm text-gray-900 underline">
                {product.exporterName || 'Unknown'}
            </td>

            {/* Genre (Origin Country) */}
            <td className="px-6 py-4 text-sm text-gray-900">
                {product.originCountry}
            </td>

            {/* Rating */}
            <td className="px-6 py-4 text-sm">
                <div className="flex items-center">
                    <span className="font-bold text-orange-500">{product.rating}</span>
                    <span className="text-yellow-400 ml-1">⭐</span>
                </div>
            </td>

            {/* Actions - Static Buttons */}
            <td className="px-6 py-4 text-sm space-x-2">
                <Link to={`/product-details/${_id}`} className="inline-block px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors shadow-sm cursor-pointer">
                    View Details
                </Link>
                
                <button className="inline-block px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded transition-colors shadow-sm cursor-pointer">
                    Update
                </button>
                
                <button className="inline-block px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors shadow-sm cursor-pointer">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default MyExportCard;