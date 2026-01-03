import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyImport = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Import";
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://export-server-alpha.vercel.app/myImport?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setImports(data.result || data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch imports:", error);
          setImports([]);
          setLoading(false);
        });
    } else {
      setImports([]);
      setLoading(false);
    }
  }, [user]);

  // Delete Functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://export-server-alpha.vercel.app/myImport/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Product has been removed from your import list.",
                icon: "success",
              });

              const remaining = imports.filter((item) => item._id !== id);
              setImports(remaining);
            }
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the product.",
              icon: "error",
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              My Imported Products
            </h1>
            <p className="text-base-content/60 mt-1">
              Manage your inventory and calculate costs
            </p>
          </div>
          <div className="badge badge-primary badge-lg mt-4 md:mt-0 p-4">
            Total Items: {imports.length}
          </div>
        </div>

        {imports.length === 0 ? (
          <div className="hero bg-base-100 rounded-box shadow-lg p-10">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold">No Imports Yet!</h2>
                <p className="py-6">
                  You haven't added any products to your import list. Browse our
                  collection and start importing now.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-300">
            <table className="table table-zebra w-full">
              {/* Table Head */}
              <thead className="bg-base-200 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Product Details</th>
                  <th>Origin</th>
                  <th>Unit Price</th>
                  <th>Inventory Status</th>
                  <th>Total Cost</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {imports.map((item) => (
                  <tr
                    key={item._id}
                    className="hover hover:bg-base-200/50 transition-colors duration-200"
                  >
                    {/* Product Info Column */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16 shadow-md bg-base-300">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-lg text-base-content">
                            {item.productName}
                          </div>
                          <div className="badge badge-sm badge-outline gap-1 text-xs">
                            <span className="text-warning">★</span>{" "}
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Origin Column */}
                    <td>
                      <div className="badge badge-ghost font-medium">
                        {item.originCountry}
                      </div>
                    </td>

                    {/* Price Column */}
                    <td className="font-semibold text-base-content/80">
                      ${item.price}
                    </td>

                    {/* Inventory Column - Stacked */}
                    <td>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 opacity-60">
                          <span className="w-2 h-2 rounded-full bg-base-content/30"></span>
                          Stock: {item.availableQuantity || 0}
                        </div>
                        {item.importQuantity && (
                          <div className="flex items-center gap-2 font-medium text-primary">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            Imported: {item.importQuantity}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Total Cost Calculation */}
                    <td>
                      {item.importQuantity ? (
                        <div className="font-bold text-lg text-success">
                          ${(item.price * item.importQuantity).toFixed(2)}
                        </div>
                      ) : (
                        <span className="text-base-content/30 italic">--</span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10 tooltip tooltip-left"
                        data-tip="Remove Item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImport;
