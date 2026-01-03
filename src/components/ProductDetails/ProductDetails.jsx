import { useContext, useState } from "react";
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

  const handleImportClick = () => {
    // 🔐 Check login first
    if (!user) {
      toast.warning("Please login to import this product");

      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });

      return;
    }

    // ✅ Logged in → open modal
    setShowModal(true);
  };

  // Your existing import functionality with modal submission
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

    // Your existing import logic - unchanged
    const { _id, ...productData } = product;

    fetch(`https://export-server-alpha.vercel.app/myImport`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...productData,
        productId: _id,
        importerEmail: user?.email,
        importQuantity: parseInt(importQuantity), // Add quantity to save
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          toast.success("Product Imported successfully!");
          setShowModal(false); // Close modal on success
          setImportQuantity(1); // Reset quantity
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
    <div className="min-h-screen bg-base-200">
      {/* Modern Header Section */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-content py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Product Details
          </h1>

          <p className="text-lg md:text-xl text-primary-content/80 max-w-2xl mx-auto">
            Discover everything you need to know about this amazing product
          </p>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 -mt-8 relative z-10">
        <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-2xl overflow-hidden">
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
              <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                {product.productName}
              </h2>

              <div className="flex gap-3">
                <div className="badge badge-lg badge-primary badge-outline font-medium">
                  📍 {product.originCountry}
                </div>

                <div className="badge badge-lg badge-secondary badge-outline font-medium">
                  ⭐ {product.rating}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <span className="font-semibold text-base-content">
                    Price:
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-success/10 p-4 rounded-lg border border-success/20">
                  <span className="font-semibold text-base-content">
                    Available Stock:
                  </span>
                  <span className="text-xl font-bold text-success">
                    {product.availableQuantity}
                  </span>
                </div>
              </div>

              {/* Action Buttons - Updated to show modal */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleImportClick}
                  className="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  disabled={product.availableQuantity <= 0}
                >
                  <FcImport className="text-2xl" />
                  <span>Import Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import Quantity Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Import Product</h3>

            <div className="space-y-4">
              <div>
                <p className="text-base-content/70 mb-2">
                  Product: {product.productName}
                </p>
                <p className="text-base-content/70 mb-4">
                  Available: {product.availableQuantity} units
                </p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Import Quantity
                  </span>
                </label>
                <input
                  type="number"
                  min="1"
                  max={product.availableQuantity}
                  value={importQuantity}
                  onChange={(e) => setImportQuantity(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="bg-info/10 p-3 rounded-lg border border-info/20">
                <p className="text-sm text-info">
                  Total Cost: ${(product.price * importQuantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
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
                className="btn btn-primary"
                onClick={handleModalSubmit}
                disabled={isImporting || !importQuantity}
              >
                {isImporting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Importing...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
