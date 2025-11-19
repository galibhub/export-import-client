import React from 'react';
import { Link } from 'react-router';

const MyExportCard = ({ product, index }) => {
    const {_id}=product;
    return (
        <tr className="hover:bg-base-200 transition-colors duration-200">
            {/* Serial Number */}
            <td className="px-6 py-4 text-sm font-medium text-base-content">
                {index + 1}
            </td>

            {/* Product Title with Image */}
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <img 
                        src={product.productImage} 
                        alt={product.productName}
                        className="h-10 w-10 rounded object-cover mr-3 border-2 border-base-300"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                        }}
                    />
                    <span className="text-sm font-medium text-base-content underline hover:text-primary">
                        {product.productName}
                    </span>
                </div>
            </td>

            {/* Exporter Name */}
            <td className="px-6 py-4 text-sm text-base-content underline">
                {product.exporterName || 'Unknown'}
            </td>

            {/* Origin Country */}
            <td className="px-6 py-4 text-sm text-base-content">
                {product.originCountry}
            </td>

            {/* Price */}
            <td className="px-6 py-4 text-sm font-medium text-base-content">
                ${product.price}
            </td>

            {/* Rating */}
            <td className="px-6 py-4 text-sm">
                <div className="flex items-center">
                    <span className="font-bold text-warning">{product.rating}</span>
                    <span className="text-warning ml-1">⭐</span>
                </div>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-sm space-x-2">
                <Link to={`/product-details/${_id}`} className="btn btn-xs btn-info">
                    View Details
                </Link>
                
                <button className="btn btn-xs btn-primary">
                    Update
                </button>
                
                <button className="btn btn-xs btn-error">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default MyExportCard;