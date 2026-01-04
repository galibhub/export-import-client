import { useContext, useState } from "react";
import {
  FaBoxOpen,
  FaDollarSign,
  FaMapMarkerAlt,
  FaStar,
  FaTag,
  FaUserTie,
} from "react-icons/fa";
import { FcImport } from "react-icons/fc";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const product = data.result;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [importQuantity, setImportQuantity] = useState(1);
  const [isImporting, setIsImporting] = useState(false);

  // Calculate Total Price Dynamic Logic
  const totalPrice = (product.price * importQuantity).toFixed(2);

  const handleImportClick = () => {
    if (!user) {
      toast.warning("Please login to import this product");
      navigate("/login", { state: { from: location.pathname }, replace: true });
      return;
    }
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (!importQuantity || importQuantity <= 0) {
      toast.error("Please enter a valid quantity!");
      return;
    }
    if (importQuantity > product.availableQuantity) {
      toast.error(`Only ${product.availableQuantity} items available!`);
      return;
    }

    setIsImporting(true);

    const { _id, ...productData } = product;

    fetch(`https://export-server-alpha.vercel.app/myImport`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...productData,
        productId: _id,
        importerEmail: user?.email,
        importQuantity: parseInt(importQuantity),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Product Imported successfully!");
          setShowModal(false);
          setImportQuantity(1);
        } else {
          toast.error("Failed to Import product");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsImporting(false);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden font-sans">
      {/* 🎨 Ultra Shape: Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-b-[4rem] -z-10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb / Back Button could go here */}

        <div className="bg-base-100/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[3rem] overflow-hidden p-8 md:p-12 flex flex-col lg:flex-row gap-12">
          {/* 🖼️ Left Side: Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden rounded-[2rem] shadow-lg h-[400px] lg:h-[500px]">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Badges on Image */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="badge badge-accent badge-lg font-bold shadow-lg animate-pulse">
                    🔥 Featured
                  </span>
                )}
                {product.category && (
                  <span className="badge bg-white/90 text-black badge-lg font-bold shadow-lg border-none">
                    <FaTag className="mr-2 text-primary" /> {product.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 📝 Right Side: Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Title & Rating */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
                {product.productName}
              </h1>
              <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full font-bold">
                <FaStar /> {product.rating}
              </div>
            </div>

            {/* Exporter Info */}
            {product.exporterName && (
              <div className="flex items-center gap-2 text-base-content/60 font-medium mb-6">
                <FaUserTie className="text-primary text-xl" />
                <span>
                  Exported by{" "}
                  <span className="text-base-content font-bold underline decoration-primary">
                    {product.exporterName}
                  </span>
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-lg text-base-content/70 leading-relaxed mb-8">
              {product.shortDescription ||
                "This product is verified for quality and is available for immediate international shipping. Secure your order now via our protected payment gateway."}
            </p>

            {/* Info Grid (Ultra Shape) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Price */}
              <div className="bg-primary/5 border border-primary/10 p-5 rounded-3xl flex flex-col items-center text-center hover:bg-primary/10 transition-colors">
                <div className="p-3 bg-primary/20 text-primary rounded-full mb-2 text-xl">
                  <FaDollarSign />
                </div>
                <span className="text-sm uppercase tracking-widest text-base-content/50 font-bold">
                  Price per Unit
                </span>
                <span className="text-3xl font-black text-primary">
                  ${product.price}
                </span>
              </div>

              {/* Stock */}
              <div
                className={`border p-5 rounded-3xl flex flex-col items-center text-center transition-colors ${
                  product.availableQuantity > 0
                    ? "bg-success/5 border-success/10 hover:bg-success/10"
                    : "bg-error/5 border-error/10"
                }`}
              >
                <div
                  className={`p-3 rounded-full mb-2 text-xl ${
                    product.availableQuantity > 0
                      ? "bg-success/20 text-success"
                      : "bg-error/20 text-error"
                  }`}
                >
                  <FaBoxOpen />
                </div>
                <span className="text-sm uppercase tracking-widest text-base-content/50 font-bold">
                  Stock Status
                </span>
                <span
                  className={`text-xl font-bold ${
                    product.availableQuantity > 0
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {product.availableQuantity > 0
                    ? `${product.availableQuantity} Available`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Origin */}
            <div className="flex items-center gap-2 mb-8 bg-base-200 w-fit px-5 py-2 rounded-full text-sm font-semibold text-base-content/70">
              <FaMapMarkerAlt className="text-secondary" />
              Origin: {product.originCountry}
            </div>

            {/* Action Button */}
            <button
              onClick={handleImportClick}
              disabled={product.availableQuantity <= 0}
              className={`btn btn-lg w-full rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 ${
                product.availableQuantity <= 0
                  ? "btn-disabled bg-gray-400"
                  : "bg-gradient-to-r from-primary to-secondary border-none"
              }`}
            >
              <FcImport className="text-3xl bg-white rounded-full p-1" />
              <span className="text-xl">
                {product.availableQuantity <= 0
                  ? "Unavailable"
                  : "Request Import"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Modern Modal */}
      {showModal && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box rounded-3xl p-8 shadow-2xl border border-base-200">
            {/* Modal Header */}
            <h3 className="font-bold text-2xl text-center mb-1">
              Confirm Import
            </h3>
            <p className="text-center text-base-content/60 mb-6">
              Review your order details below
            </p>

            <div className="bg-base-200/50 p-4 rounded-2xl mb-6 space-y-3">
              <div className="flex justify-between items-center border-b border-base-content/10 pb-2">
                <span className="font-semibold text-base-content/70">
                  Product
                </span>
                <span className="font-bold text-right truncate max-w-[150px]">
                  {product.productName}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-base-content/10 pb-2">
                <span className="font-semibold text-base-content/70">
                  Unit Price
                </span>
                <span className="font-bold">${product.price}</span>
              </div>

              {/* Quantity Input */}
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-base-content/70">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max={product.availableQuantity}
                    value={importQuantity}
                    onChange={(e) => setImportQuantity(e.target.value)}
                    className="input input-sm input-bordered input-primary w-20 text-center font-bold"
                  />
                  <span className="text-xs text-base-content/50">
                    / {product.availableQuantity}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Cost Display */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-2xl flex justify-between items-center shadow-lg mb-6">
              <span className="font-medium opacity-90">Total Payable</span>
              <span className="text-2xl font-black">${totalPrice}</span>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="btn btn-outline border-base-300 hover:bg-base-200 rounded-xl"
                onClick={() => {
                  setShowModal(false);
                  setImportQuantity(1);
                }}
                disabled={isImporting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-xl text-white shadow-lg"
                onClick={handleModalSubmit}
                disabled={isImporting || !importQuantity || importQuantity <= 0}
              >
                {isImporting ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Confirm Import"
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
