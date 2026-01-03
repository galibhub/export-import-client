import { useEffect, useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaTrashAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // প্রতি পেজে ১০টি ডাটা দেখাবে

  useEffect(() => {
    fetch("https://export-server-alpha.vercel.app/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Pagination Logic (useMemo ব্যবহার করা হয়েছে যাতে ক্যালকুলেশন বারবার না হয়)
  const currentProducts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return products.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApprove = (id) => {
    fetch(`https://export-server-alpha.vercel.app/products/approve/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Approved!",
          text: "Product is now live.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
        );
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://export-server-alpha.vercel.app/products/${id}`, {
          method: "DELETE",
        }).then(() => {
          Swal.fire("Deleted!", "Product has been removed.", "success");
          const remaining = products.filter((p) => p._id !== id);
          setProducts(remaining);

          // যদি বর্তমান পেজের শেষ আইটেম ডিলেট হয়, আগের পেজে নিয়ে যাবে
          if (currentProducts.length === 1 && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          }
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Manage Products
            </h1>
            <p className="text-base-content/60 mt-1">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaBoxOpen className="text-3xl" />
                </div>
                <div className="stat-title font-semibold">Total Products</div>
                <div className="stat-value text-secondary">
                  {products.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-200 flex flex-col min-h-[500px]">
          <div className="overflow-x-auto flex-grow">
            <table className="table w-full">
              <thead className="bg-base-200 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="py-4 pl-6">#</th>
                  <th>Product Details</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-base-200">
                {currentProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-base-200/40 transition-colors duration-200"
                  >
                    <td className="font-bold pl-6 text-base-content/50">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-base-300 shadow-sm flex items-center justify-center">
                            {/* Optimization: loading="lazy" added */}
                            {product.productImage ? (
                              <img
                                src={product.productImage}
                                alt="Product"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <FaBoxOpen className="text-xl opacity-50" />
                            )}
                          </div>
                        </div>
                        <div className="font-bold text-base text-base-content">
                          {product.productName}
                        </div>
                      </div>
                    </td>

                    <td>
                      {product.status === "approved" ? (
                        <div className="badge badge-success gap-2 p-3 text-white shadow-sm">
                          <FaCheckCircle className="text-xs" /> Approved
                        </div>
                      ) : (
                        <div className="badge badge-warning gap-2 p-3 shadow-sm text-warning-content">
                          <FaClock className="text-xs" /> Pending
                        </div>
                      )}
                    </td>

                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {product.status !== "approved" && (
                          <div className="tooltip" data-tip="Approve Product">
                            <button
                              onClick={() => handleApprove(product._id)}
                              className="btn btn-sm btn-circle btn-ghost text-success hover:bg-success/10"
                            >
                              <FaCheckCircle className="text-lg" />
                            </button>
                          </div>
                        )}

                        <div className="tooltip" data-tip="Delete Product">
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
                          >
                            <FaTrashAlt className="text-lg" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {products.length > itemsPerPage && (
            <div className="p-4 border-t border-base-200 flex justify-center items-center gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft /> Prev
              </button>

              <div className="join">
                {/* Simple Page Numbers Logic */}
                {[...Array(totalPages)].map((_, i) => {
                  // Show specific pages to avoid clutter if too many pages
                  if (
                    i === 0 ||
                    i === totalPages - 1 ||
                    (i >= currentPage - 2 && i <= currentPage)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`join-item btn btn-sm ${
                          currentPage === i + 1 ? "btn-primary" : "btn-ghost"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                className="btn btn-sm btn-outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
