import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  FiHome,
  FiBox,
  FiUpload,
  FiUsers,
  FiPieChart,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { user, LogOut } = useContext(AuthContext); // ✅ FIXED (LogOut)
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 🔐 SIMPLE ROLE LOGIC (temporary for assignment)
  const role = user?.email === "admin@gmail.com" ? "admin" : "user";

  const closeDrawer = () => setIsDrawerOpen(false);

  // Active / Inactive Menu Style
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-white text-indigo-600 shadow-lg translate-x-2"
        : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
    }`;

  /* ================= USER MENU ================= */
  const UserMenu = () => (
    <>
      <li className="menu-title text-indigo-200 opacity-70 uppercase tracking-wider mt-4">
        User Panel
      </li>

      <li>
        <NavLink to="/dashboard" end className={navLinkClasses} onClick={closeDrawer}>
          <FiPieChart className="text-xl" /> Dashboard Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/my-imports" className={navLinkClasses} onClick={closeDrawer}>
          <FiBox className="text-xl" /> My Imports
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/my-exports" className={navLinkClasses} onClick={closeDrawer}>
          <FiUpload className="text-xl" /> My Exports
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/add-export" className={navLinkClasses} onClick={closeDrawer}>
          <FiUpload className="text-xl" /> Add Export
        </NavLink>
      </li>
    </>
  );

  /* ================= ADMIN MENU ================= */
  const AdminMenu = () => (
    <>
      <li className="menu-title text-indigo-200 opacity-70 uppercase tracking-wider mt-4">
        Admin Control
      </li>

      <li>
        <NavLink to="/dashboard/admin" end className={navLinkClasses} onClick={closeDrawer}>
          <FiPieChart className="text-xl" /> Admin Overview
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/admin/manage-users" className={navLinkClasses} onClick={closeDrawer}>
          <FiUsers className="text-xl" /> Manage Users
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/admin/manage-products" className={navLinkClasses} onClick={closeDrawer}>
          <FiBox className="text-xl" /> Manage Products
        </NavLink>
      </li>
    </>
  );

  /* ================= LOGOUT HANDLER ================= */
  const handleLogout = () => {
    LogOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed");
      });
  };

  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-100 shadow-sm lg:hidden sticky top-0 z-30">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <FiMenu className="text-2xl" />
            </label>
          </div>
          <div className="flex-1">
            <span className="font-bold text-xl text-indigo-600">Dashboard</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-80 min-h-full bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 flex flex-col text-white">
          {/* Logo */}
          <div className="h-20 flex items-center justify-center border-b border-white/10">
            <Link to="/" className="text-2xl font-extrabold">
              Export Import <span className="text-yellow-300">Hub</span>
            </Link>
          </div>

          {/* Menu */}
          <ul className="menu flex-1 p-4">
            {role === "admin" ? <AdminMenu /> : <UserMenu />}

            <div className="divider opacity-20 my-4"></div>

            <li>
              <NavLink to="/" className={navLinkClasses}>
                <FiHome className="text-xl" /> Home
              </NavLink>
            </li>
          </ul>

          {/* User Footer */}
          <div className="p-4 border-t border-white/10 bg-black/10">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-white/30 ring-offset-1">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt="User"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{user?.displayName || "User"}</p>
                <p className="text-xs text-indigo-200 truncate">{user?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-circle btn-ghost btn-sm tooltip tooltip-left"
                data-tip="Logout"
              >
                <FiLogOut className="text-lg" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
