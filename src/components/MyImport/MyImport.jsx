import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const MyImport = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myImport?email=${user.email}`)
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
        fetch(`http://localhost:3000/myImport/${id}`, {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content">
            My Imported Products
          </h1>
          <p className="py-2 text-base-content/70">
            Manage your import list efficiently
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imports.map((item) => (
              <article
                key={item._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200"
              >
                <figure className="relative h-56 overflow-hidden">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-4 right-4 badge badge-secondary font-semibold shadow-md">
                    {item.originCountry}
                  </div>
                </figure>

                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-xl font-bold text-base-content">
                      {item.productName}
                    </h2>
                    <div className="badge badge-outline gap-1 p-3">
                      ⭐ {item.rating}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mt-2">
                    <p className="text-sm text-base-content/60">Import Price</p>
                    <p className="text-2xl font-bold text-primary">
                      ${item.price}
                    </p>
                  </div>

                  {/* Stock and Import Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                      <span>
                        Available Qty:{" "}
                        <span className="font-semibold">
                          {item.availableQuantity || 0}
                        </span>
                      </span>
                    </div>

                    {/* Show import quantity if it exists */}
                    {item.importQuantity && (
                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3-15a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 016 5.25z"
                          />
                        </svg>
                        <span>
                          Import Qty:{" "}
                          <span className="font-semibold text-primary">
                            {item.importQuantity}
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Show total cost if import quantity exists */}
                    {item.importQuantity && (
                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Total Cost:{" "}
                          <span className="font-semibold text-success">
                            ${(item.price * item.importQuantity).toFixed(2)}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error btn-outline btn-sm hover:text-white w-full"
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
                      Delete Item
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImport;
