import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaBoxOpen, FaArrowRight, FaTag, FaUserTie } from "react-icons/fa";

const LatestProduct = ({ product }) => {
  const {
    _id,
    productName,
    productImage,
    price,
    originCountry,
    rating,
    availableQuantity,
    category,
    exporterName,     
    shortDescription, 
    isFeatured,
  } = product;

  // Logic
  const isOutOfStock = availableQuantity === 0;

  return (
    <div className={`group relative bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full ${isOutOfStock ? 'opacity-70 grayscale-[0.8] pointer-events-none' : ''}`}>
      
      {/* 🖼️ IMAGE SECTION */}
      <figure className="relative h-64 overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay (Bottom Fade) */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-60"></div>

        {/* 🏷️ Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {isFeatured && !isOutOfStock && (
            <div className="badge border-none bg-gradient-to-r from-secondary to-pink-500 text-white shadow-lg font-bold px-3 py-3 animate-pulse">
              🔥 Featured
            </div>
          )}
          {category && (
            <div className="badge border-none bg-base-100/80 backdrop-blur-md text-base-content font-semibold px-3 py-3 shadow-md">
              <FaTag className="mr-1 text-xs text-primary" /> {category}
            </div>
          )}
        </div>

        {/* ⭐ Rating Badge (Glassmorphism) */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 shadow-lg border border-white/20">
          <FaStar className="text-yellow-400" /> {rating || 0}
        </div>

        {/* 🚫 Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white z-20">
             <FaBoxOpen className="text-4xl opacity-50 mb-2" />
             <span className="text-xl font-bold uppercase tracking-widest border-2 border-white/50 px-4 py-1 rounded-lg">Sold Out</span>
          </div>
        )}
      </figure>

      {/* 📝 CONTENT SECTION */}
      <div className="p-6 pt-2 flex flex-col flex-grow relative">
        
        {/* Floating Price Tag (Overlapping Image) */}
        <div className="absolute -top-6 right-6 bg-primary text-white px-4 py-2 rounded-xl shadow-lg font-bold text-lg transform group-hover:scale-110 transition-transform duration-300 border-4 border-base-100 z-10">
           ${Number(price).toFixed(2)}
        </div>

        {/* 🌍 Origin Tag */}
        <div className="flex items-center gap-1 text-xs text-base-content/60 mb-1 font-medium uppercase tracking-wide">
          <FaMapMarkerAlt className="text-secondary" /> {originCountry}
        </div>

        {/* 👤 Exporter Name (✅ Added) */}
        {exporterName && (
            <div className="flex items-center gap-2 text-xs text-base-content/60 mb-2 font-medium">
                <FaUserTie className="text-primary" />
                <span>By {exporterName}</span>
            </div>
        )}

        {/* Title */}
        <h2 className="card-title text-xl font-extrabold text-base-content mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {productName}
        </h2>

        {/* 📄 Short Description (✅ Added) */}
        <p className="text-sm text-base-content/70 line-clamp-2 mb-4 min-h-[40px]">
            {shortDescription || "Premium quality product available for global export. Verified and ready to ship."}
        </p>

        {/* Stock Bar (Visual) */}
        <div className="mt-auto space-y-4">
          <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full ${availableQuantity < 10 ? 'bg-warning' : 'bg-success'}`} 
              style={{ width: `${Math.min(availableQuantity, 100)}%` }} // Visual cap at 100%
            ></div>
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className={availableQuantity < 10 ? "text-warning" : "text-success"}>
              {availableQuantity > 0 ? `${availableQuantity} In Stock` : "Unavailable"}
            </span>
            <span className="text-base-content/40">Ready to ship</span>
          </div>

          {/* Action Button */}
          <Link
            to={`/product-details/${_id}`}
            className={`btn btn-block border-none text-white rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${isOutOfStock ? 'btn-disabled bg-gray-400' : 'bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l'}`}
          >
            {isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                View Details <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;