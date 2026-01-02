import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyExport = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Export";
  }, []);

  // Initial load
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/myExport?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.result || []);
        setLoading(false);
      });
  }, [user]);

  // 🔁 AUTO REFRESH (Admin approve করলে status update হবে)
  useEffect(() => {
    if (!user?.email) return;

    const interval = setInterval(() => {
      fetch(`http://localhost:3000/myExport?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.result || []);
        });
    }, 5000); // every 5 sec

    return () => clearInterval(interval);
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
        })
          .then((res) => res.json())
          .then(() => {
            const remaining = products.filter(
              (item) => item._id !== _id
            );
            setProducts(remaining);
            Swal.fire("Deleted!", "Export deleted.", "success");
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

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">My Exports</h1>
            <p className="text-base-content/60">
              Manage your export products
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/dashboard/add-export" className="btn btn-primary">
              + Add Export
            </Link>
            <div className="badge badge-secondary badge-lg">
              Total: {products.length}
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="bg-base-100 p-10 rounded-xl text-center shadow">
            <h2 className="text-2xl font-bold">No Exports Yet</h2>
            <Link to="/dashboard/add-export" className="btn btn-primary mt-4">
              Add Export
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
            <table className="table table-zebra w-full">

              {/* TABLE HEAD */}
              <thead className="bg-base-200 text-xs uppercase">
                <tr>
                  <th>Product</th>
                  <th>Exporter</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {products.map((item) => (
                  <tr key={item._id}>
                    {/* Product */}
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-14 h-14 rounded object-cover"
                        />
                        <div>
                          <p className="font-bold">{item.productName}</p>
                          <p className="text-xs">⭐ {item.rating}</p>
                        </div>
                      </div>
                    </td>

                    {/* Exporter */}
                    <td>{item.exporterName}</td>

                    {/* Destination */}
                    <td>
                      <span className="badge badge-ghost">
                        {item.originCountry || "Global"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`badge font-semibold ${
                          item.status === "approved"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="font-bold text-primary">
                      ${item.price}
                    </td>

                    {/* Action */}
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-error btn-outline"
                        disabled={item.status === "approved"}
                        title={
                          item.status === "approved"
                            ? "Approved product can't be deleted"
                            : ""
                        }
                      >
                        Delete
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
