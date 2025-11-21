import { use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const AddExport = () => {
  const { user } = use(AuthContext);
  const handleAddExport = (e) => {
    e.preventDefault();

    const formData = {
      productName: e.target.productName.value,
      productImage: e.target.productImage.value,
      price: parseFloat(e.target.price.value),
      originCountry: e.target.originCountry.value,
      rating: parseFloat(e.target.rating.value),
      availableQuantity: parseInt(e.target.availableQuantity.value),
      createdAt: new Date(),
      downloads: 0,
      exporterName: user?.displayName || user?.name || "Unknown Exporter",
      exporterEmail: user?.email || "unknown@email.com",
    };
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Product added successfully!");
          e.target.reset(); // Form reset
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Product Data:", formData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-base-content tracking-wide">
            Add New Export
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Expand your global catalog by adding a new product below.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-base-300">
          <form onSubmit={handleAddExport} className="space-y-6">
            {/* Row 1: Name & Price */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-base-content">
                  Product Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="productName"
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-base-300 rounded-lg p-3 border bg-base-200 text-base-content"
                    placeholder="Product Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content">
                  Price (USD)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-base-content/70 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-base-300 rounded-lg p-3 border bg-base-200 text-base-content [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Image URL */}
            <div>
              <label className="block text-sm font-medium text-base-content">
                Product Image URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-base-content/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="url"
                  name="productImage"
                  required
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-base-300 rounded-lg p-3 border bg-base-200 text-base-content"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Row 3: Origin Country & Quantity */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-base-content">
                  Origin Country
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="originCountry"
                    required
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-base-300 rounded-lg p-3 border bg-base-200 text-base-content"
                    placeholder="e.g. Bangladesh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content">
                  Available Quantity
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <input
                    type="number"
                    name="availableQuantity"
                    required
                    min="1"
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-base-300 rounded-lg p-3 border bg-base-200 text-base-content [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Rating */}
            <div>
              <label className="block text-sm font-medium text-base-content">
                Rating
              </label>
              <div className="mt-1">
                <select
                  name="rating"
                  required
                  className="block w-full pl-3 pr-10 py-3 text-base border-base-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg border bg-base-200 text-base-content"
                >
                  <option value="">Select Rating Score</option>
                  <option value="5"> 5.0</option>
                  <option value="4.5">4.5</option>
                  <option value="4">4.0</option>
                  <option value="3.5">3.5</option>
                  <option value="3">3.0</option>
                  <option value="2.5">2.5</option>
                  <option value="2">2.0</option>
                  <option value="1.5">1.5</option>
                  <option value="1">1.0</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-content bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
              >
                Add Export
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExport;
