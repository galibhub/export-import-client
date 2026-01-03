import { Link } from "react-router-dom";

const LatestProduct = ({ product }) => {
  const {
    _id,
    productName,
    productImage,
    price,
    originCountry,
    rating,
    availableQuantity,
    exporterName,
    category,
    shortDescription,
    isFeatured,
  } = product;

  // 1. Handle Out of Stock Logic
  const isOutOfStock = availableQuantity === 0;

  return (
    <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 h-full flex flex-col ${isOutOfStock ? 'opacity-80 grayscale-[0.5]' : ''}`}>

      {/* Image Section */}
      <figure className="px-4 pt-4 relative overflow-hidden group">
        <img
          src={productImage}
          alt={productName}
          loading="lazy" // ⚡️ Optimization: Lazy load images
          className="rounded-xl w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Featured Badge */}
        {isFeatured && !isOutOfStock && (
          <div className="absolute top-6 left-6 badge badge-accent font-semibold shadow-md animate-pulse">
            Featured
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
             <span className="badge badge-error font-bold text-lg p-4">Out of Stock</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-6 right-6 bg-white/90 text-yellow-500 px-2 py-1 rounded-full font-bold text-xs shadow backdrop-blur-sm flex items-center gap-1">
          <span>⭐</span> {rating || 0}
        </div>
      </figure>

      {/* Body */}
      <div className="card-body flex-grow p-6">

        {/* Category */}
        {category && (
          <div className="badge badge-outline badge-primary text-xs w-fit mb-1">
            {category}
          </div>
        )}

        {/* Title */}
        <h2 className="card-title text-xl font-bold text-base-content line-clamp-1" title={productName}>
          {productName}
        </h2>

        {/* Short Description */}
        <p className="text-sm text-base-content/70 line-clamp-2 mt-1 min-h-[40px]">
          {shortDescription || "No description available for this product."}
        </p>

        {/* Info Grid */}
        <div className="space-y-3 my-4">
          
          {/* Price */}
          <div className="flex justify-between items-center bg-base-200/50 p-3 rounded-lg border border-base-200">
            <span className="font-medium text-base-content/70 text-sm">Price</span>
            <span className="text-xl font-bold text-primary">
              {/* 💲 Format Currency */}
              ${Number(price).toFixed(2)}
            </span>
          </div>

          {/* Origin & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-base-200/50 p-2 rounded-lg text-center border border-base-200">
              <p className="text-[10px] uppercase tracking-wide text-base-content/60">Origin</p>
              <p className="font-semibold text-sm truncate">{originCountry}</p>
            </div>

            <div className={`p-2 rounded-lg text-center border ${isOutOfStock ? 'bg-error/10 border-error/20' : 'bg-success/10 border-success/20'}`}>
              <p className="text-[10px] uppercase tracking-wide text-base-content/60">Stock</p>
              <p className={`font-semibold text-sm ${isOutOfStock ? 'text-error' : 'text-success'}`}>
                {availableQuantity} units
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="card-actions mt-auto">
          <Link
            to={`/product-details/${_id}`}
            className={`btn btn-primary w-full shadow-md hover:scale-[1.02] transition-transform ${isOutOfStock ? 'btn-disabled' : ''}`}
          >
            {isOutOfStock ? "Unavailable" : "View Details"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;