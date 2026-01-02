import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
// MyExportCard is no longer needed for this table layout
// import MyExportCard from "../../../components/MyExport/MyExportCard";

const MyExport = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Export";
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/myExport?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.result || []);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (_id) => {
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
        fetch(`http://localhost:3000/products/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const remaining = products.filter((item) => item._id !== _id);
            setProducts(remaining);
            Swal.fire({
              title: "Deleted!",
              text: "Your Exported Product has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
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
        
        {/* Header Section (Matching MyImport Design) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              My Exports
            </h1>
            <p className="text-base-content/60 mt-1">
              Manage your global inventory and export status
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <Link
              to="/addExport"
              className="btn btn-primary btn-sm md:btn-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Export
            </Link>
            <div className="badge badge-secondary badge-lg p-4">
              Total: {products.length}
            </div>
          </div>
        </div>

        {/* Content Section */}
        {products.length === 0 ? (
          <div className="hero bg-base-100 rounded-box shadow-lg p-10">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold">No Exports Yet!</h2>
                <p className="py-6">
                  You haven't added any products to your export list. 
                  Start growing your business now.
                </p>
                <Link
                  to="/addExport"
                  className="btn btn-primary"
                >
                  Add Your First Product
                </Link>
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
                  <th>Exporter Info</th>
                  <th>Destination</th>
                  <th>Unit Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="hover hover:bg-base-200/50 transition-colors duration-200">
                    
                    {/* Column 1: Product Details (Image, Name, Rating) */}
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
                            <span className="text-warning">★</span> {item.rating}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Exporter Name */}
                    <td>
                      <div className="font-medium text-base-content/80">
                        {item.exporterName || user.displayName || "N/A"}
                      </div>
                      <div className="text-xs text-base-content/50">
                        Exporter
                      </div>
                    </td>

                    {/* Column 3: Destination (Country) */}
                    <td>
                      <div className="badge badge-ghost font-medium">
                        {item.country || "Global"}
                      </div>
                    </td>

                    {/* Column 4: Price */}
                    <td className="font-semibold text-primary text-lg">
                      ${item.price}
                    </td>

                    {/* Column 5: Action */}
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10 tooltip tooltip-left"
                        data-tip="Delete Export"
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

export default MyExport;