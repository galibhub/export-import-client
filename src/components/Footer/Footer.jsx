import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

// 📦 Import Icons
import { 
  FaGlobeAmericas, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaGithub,
  FaChevronRight 
} from "react-icons/fa";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  // 🔍 Fetch role when user is logged in
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/users/role/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, [user]);

  // 🔐 Smart Dashboard Routing
  const dashboardLink = (userPath) => {
    if (!user) return "/login"; // not logged in
    if (role === "admin") return "/dashboard/admin"; // admin
    return `/dashboard/${userPath}`; // normal user
  };

  // Reusable Link Item Component for consistent hover effects
  const FooterLink = ({ to, text }) => (
    <li>
      <Link
        to={to}
        className="group flex items-center text-gray-400 hover:text-emerald-400 transition-all duration-300 ease-in-out"
      >
        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-xs mr-2">
          <FaChevronRight />
        </span>
        {text}
      </Link>
    </li>
  );

  return (
    <footer className="bg-gray-900 text-white border-t-4 border-emerald-500 relative overflow-hidden">
      
      {/* Background Decorative Blob (Optional) */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 1️⃣ Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <FaGlobeAmericas className="text-3xl text-emerald-500 group-hover:rotate-180 transition-transform duration-700" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ExportHub
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simplifying global trade with secure, efficient, and transparent
              export-import solutions. Connect with the world today.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* 2️⃣ Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/allProducts" text="All Products" />
              <FooterLink to="/about-us" text="About Us" />
              <FooterLink to="/contact-us" text="Contact Support" />
            </ul>
          </div>

          {/* 3️⃣ User Dashboard (Logic Preserved) */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2 inline-block">
              Dashboard
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to={dashboardLink("add-export")} text="Add Export" />
              <FooterLink to={dashboardLink("my-exports")} text="My Exports" />
              <FooterLink to={dashboardLink("my-imports")} text="My Imports" />
            </ul>

            {/* 🔔 Dynamic Status Messages */}
            <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
              {!user ? (
                <p className="text-xs text-yellow-500 flex items-start gap-2">
                  <span>🔒</span> 
                  <span>Please <b>Login</b> to access full features.</span>
                </p>
              ) : role === "admin" ? (
                <p className="text-xs text-cyan-400 flex items-start gap-2">
                   <span>🛡️</span>
                   <span>Admin Mode Active</span>
                </p>
              ) : (
                <p className="text-xs text-emerald-400 flex items-start gap-2">
                  <span>👤</span>
                  <span>User Mode Active</span>
                </p>
              )}
            </div>
          </div>

          {/* 4️⃣ Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2 inline-block">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400 group">
                <FaMapMarkerAlt className="text-emerald-500 text-lg mt-1 group-hover:animate-bounce" />
                <span>
                  123 Trade Center, <br />
                  Dhanmondi, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <FaPhone className="text-emerald-500 text-lg group-hover:animate-pulse" />
                <span>+880 1712 345 678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <FaEnvelope className="text-emerald-500 text-lg group-hover:animate-pulse" />
                <span>support@exporthub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Export Import Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;