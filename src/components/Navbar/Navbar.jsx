import { use } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, LogOut } = use(AuthContext);

  const links = (
    <>
      <li className="text-primary font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-primary font-semibold">
        <NavLink to="/allProducts">All Products</NavLink>
      </li>
      <li className="text-primary font-semibold">
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li className="text-primary font-semibold">
        <NavLink to="/contact-us">Contact Us</NavLink>
      </li>
      <li className="text-primary font-semibold">
        <NavLink to="/myExport">My Export</NavLink>
      </li>
      <li className="text-primary font-semibold">
        <NavLink to="/myImport">My Import</NavLink>
      </li>
      <li className="text-primary font-semibold">
        <NavLink to="/addExport">Add Export</NavLink>
      </li>
    </>
  );

  //---------logout--------------
  const handleLogOut = () => {
    LogOut()
      .then(() => {
        alert("Sign Out Successfully");
      })
      .catch((error) => {
        alert(`An Error happened: ${error.message}`);
      });
  };

  return (
    <div className="navbar bg-gradient-to-r from-emerald-50 to-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          Export <span className="text-primary">Import</span> Hub
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <input
          type="checkbox"
          className="toggle toggle-primary mr-4"
        />
        <div className="flex items-center gap-2">
          {/* ✅ User থাকলে Image দেখাবে */}
          {user && (
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/WchFhLg/user.png"}
                  alt={user.displayName || "User"}
                  title={user.email} // Hover করলে email দেখাবে
                />
              </div>
            </div>
          )}
          
          {/* Login/Logout Button */}
          {user ? (
            <button onClick={handleLogOut} className="btn btn-primary">
              Sign Out
            </button>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-primary">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;