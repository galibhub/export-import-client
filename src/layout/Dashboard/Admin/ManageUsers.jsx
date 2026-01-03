import { useContext, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

import {
  FaChevronLeft,
  FaChevronRight,
  FaTrashAlt,
  FaUserShield,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const ManageUsers = () => {
  const { user: loggedInUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page

  useEffect(() => {
    fetch("https://export-server-alpha.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // Pagination Logic: Slice data based on current page
  const currentUsers = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return users.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, users]);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeRole = (user, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change this user's role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://export-server-alpha.vercel.app/users/role/${user._id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ role }),
        }).then(() => {
          Swal.fire({
            title: "Updated!",
            text: `User is now an ${role}.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          // Update the main list; useMemo will update currentUsers automatically
          setUsers((prev) =>
            prev.map((u) => (u._id === user._id ? { ...u, role } : u))
          );
        });
      }
    });
  };

  const deleteUser = (id) => {
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
        fetch(`https://export-server-alpha.vercel.app/users/${id}`, {
          method: "DELETE",
        }).then(() => {
          Swal.fire("Deleted!", "User has been deleted.", "success");

          const remaining = users.filter((u) => u._id !== id);
          setUsers(remaining);

          // If the last item on the current page is deleted, go back one page
          if (currentUsers.length === 1 && currentPage > 1) {
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
              Manage Users
            </h1>
            <p className="text-base-content/60 mt-1">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <FaUsers className="text-3xl" />
                </div>
                <div className="stat-title font-semibold">Total Users</div>
                <div className="stat-value text-primary">{users.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-200 flex flex-col min-h-[500px]">
          <div className="overflow-x-auto flex-grow">
            <table className="table w-full">
              {/* Table Head */}
              <thead className="bg-base-200 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="py-4 pl-6">#</th>
                  <th>User Identity</th>
                  <th>Role Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body (Mapping currentUsers instead of all users) */}
              <tbody className="divide-y divide-base-200">
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-base-200/40 transition-colors duration-200"
                  >
                    {/* Index Calculation for continuous numbering across pages */}
                    <td className="font-bold pl-6 text-base-content/50">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>

                    {/* User Identity Column */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full overflow-hidden ring ring-primary/20">
                            {user.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                {user.email?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="font-bold text-base-content">
                            {user.name || "Unknown Name"}
                          </div>
                          <div className="text-sm text-base-content/60">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Column */}
                    <td>
                      {user.role === "admin" ? (
                        <div className="badge badge-primary gap-2 p-3 shadow-md shadow-primary/20">
                          <FaUserShield /> Admin
                        </div>
                      ) : (
                        <div className="badge badge-ghost gap-2 p-3 border-base-300">
                          <FaUserTie /> User
                        </div>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {/* Role Toggle Button */}
                        {user.role === "admin" ? (
                          <div className="tooltip" data-tip="Demote to User">
                            <button
                              onClick={() => changeRole(user, "user")}
                              disabled={user.email === loggedInUser?.email}
                              className="btn btn-sm btn-circle btn-ghost text-warning hover:bg-warning/10 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <FaUserTie className="text-lg" />
                            </button>
                          </div>
                        ) : (
                          <div className="tooltip" data-tip="Promote to Admin">
                            <button
                              onClick={() => changeRole(user, "admin")}
                              disabled={user.email === loggedInUser?.email}
                              className="btn btn-sm btn-circle btn-ghost text-success hover:bg-success/10 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <FaUserShield className="text-lg" />
                            </button>
                          </div>
                        )}

                        {/* Delete Button */}
                        <div className="tooltip" data-tip="Delete User">
                          <button
                            onClick={() => deleteUser(user._id)}
                            disabled={user.email === loggedInUser?.email}
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10 disabled:opacity-40 disabled:cursor-not-allowed"
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
          {users.length > itemsPerPage && (
            <div className="p-4 border-t border-base-200 flex justify-center items-center gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft /> Prev
              </button>

              <div className="join">
                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, i) => {
                  // Logic to show limited page numbers (First, Last, Current, Neighbors)
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

export default ManageUsers;
