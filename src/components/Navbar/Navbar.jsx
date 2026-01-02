import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaShippingFast } from "react-icons/fa";

import { FcAbout, FcHome } from "react-icons/fc";
import { MdOutlineDashboardCustomize, MdProductionQuantityLimits } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { RiLoginCircleLine } from "react-icons/ri";

const Navbar = () => {
  const { user, LogOut } = use(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light")
  }

  // Helper function for styling active links
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
      isActive 
        ? "bg-primary text-white shadow-md" 
        : "text-base-content hover:bg-base-200 hover:text-primary"
    }`;

  const links = (
  <>
    <li>
      <NavLink to="/" className={navLinkStyle}><FcHome />
Home</NavLink>
    </li>

    <li>
      <NavLink to="/allProducts" className={navLinkStyle}><MdProductionQuantityLimits />All Products</NavLink>
    </li>

    <li>
      <NavLink to="/about-us" className={navLinkStyle}><FcAbout />
About Us</NavLink>
    </li>

    <li>
      <NavLink to="/contact-us" className={navLinkStyle}><BiSolidContact />
Contact Us</NavLink>
    </li>

    {user && (
      <li>
        <NavLink to="/dashboard" className={navLinkStyle}>
          <MdOutlineDashboardCustomize />
Dashboard
        </NavLink>
      </li>
    )}
  </>
);


  const handleLogOut = () => {
    LogOut()
      .then(() => {
        toast.success("Sign Out Successfully");
      })
      .catch((error) => {
        toast.error(`An Error happened: ${error.message}`);
      });
  };

  return (
    // Added sticky positioning and backdrop blur for a modern feel
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200">
      
      {/* Colorful Gradient Border Line */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>

      <div className="navbar container mx-auto px-4">
        
        {/* Navbar Start - Mobile Menu & Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-4 shadow-xl border border-base-200 gap-2"
            >
              {links}
            </ul>
          </div>
          
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <FaShippingFast className="text-primary text-2xl group-hover:scale-110 transition-transform" />
            </div>
            <span className="hidden sm:inline font-extrabold text-2xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/70">Export</span>
              <span className="text-primary">Import</span>
              <span className="text-secondary">Hub</span>
            </span>
          </NavLink>
        </div>

        {/* Navbar Center - Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 items-center">
            {links}
          </ul>
        </div>

        {/* Navbar End - Theme, User, Auth */}
        <div className="navbar-end gap-3">
          
          {/* Theme Toggle */}
          <label className="swap swap-rotate hover:scale-110 transition-transform">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={localStorage.getItem('theme') === "dark"}
            />
            
            {/* Sun icon - Styled Yellow */}
            <svg className="swap-off fill-amber-400 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
            
            {/* Moon icon - Styled Blue */}
            <svg className="swap-on fill-indigo-400 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
            </svg>
          </label>

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <img
                      src={user.photoURL || "https://i.ibb.co/WchFhLg/user.png"}
                      alt="User"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {user ? (
              <button 
                onClick={handleLogOut} 
                className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white border-none hover:shadow-lg hover:brightness-110"
              >
               <TbLogout /> Sign Out
              </button>
            ) : (
              <NavLink to="/login">
                <button className="btn bg-gradient-to-r from-primary to-secondary text-white border-none hover:shadow-lg hover:brightness-110 px-6">
                  <RiLoginCircleLine />Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;