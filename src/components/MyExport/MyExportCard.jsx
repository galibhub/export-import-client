import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyExportCard = ({ product, index ,handleDelete}) => {
  const { _id } = product;

//   const navigate=useNavigate()

  

  return (
    <tr className="hover:bg-base-200 transition-colors duration-200">
  {/* Serial Number */}
  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-base-content">
    {index + 1}
  </td>

  {/* Product Title with Image */}
  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
    <div className="flex items-center gap-2 sm:gap-3">
      <img
        src={product.productImage}
        alt={product.productName}
        className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover border-2 border-base-300"
        
      />
      <span className="text-xs sm:text-sm font-medium text-base-content underline hover:text-primary line-clamp-2">
        {product.productName}
      </span>
    </div>
  </td>

  {/* Exporter Name - Hidden on mobile */}
  <td className="hidden md:table-cell px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-base-content underline">
    {product.exporterName || "Unknown"}
  </td>

  {/* Origin Country - Hidden on mobile */}
  <td className="hidden lg:table-cell px-6 py-4 text-sm text-base-content">
    {product.originCountry}
  </td>

  {/* Price */}
  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-base-content">
    ${product.price}
  </td>

  {/* Rating - Hidden on small mobile */}
  <td className="hidden sm:table-cell px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm">
    <div className="flex items-center gap-1">
      <span className="font-bold text-warning">{product.rating}</span>
      <span className="text-warning">⭐</span>
    </div>
  </td>

  {/* Actions */}
  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm">
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
      <Link to={`/product-details/${_id}`} className="btn btn-xs sm:btn-sm btn-info whitespace-nowrap">
        View
      </Link>

      <Link to={`/updateExport/${_id}`} className="btn btn-xs sm:btn-sm btn-primary whitespace-nowrap">
        Update
      </Link>

      <button onClick={()=>handleDelete(_id)} className="btn btn-xs sm:btn-sm btn-error whitespace-nowrap">
        Delete
      </button>
    </div>
  </td>
</tr>
  );
};

export default MyExportCard;
