import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

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

  const links = (
    <>
      <li className="text-base-content font-semibold">
        <NavLink to="/" className="hover:text-primary">Home</NavLink>
      </li>
      <li className="text-base-content font-semibold">
        <NavLink to="/allProducts" className="hover:text-primary">All Products</NavLink>
      </li>
      <li className="text-base-content font-semibold">
        <NavLink to="/about-us" className="hover:text-primary">About Us</NavLink>
      </li>
      <li className="text-base-content font-semibold">
        <NavLink to="/contact-us" className="hover:text-primary">Contact Us</NavLink>
      </li>
      <li className="text-base-content font-semibold">
        <NavLink to="/myExport" className="hover:text-primary">My Export</NavLink>
      </li>
      <li className="text-base-content font-semibold">
        <NavLink to="/myImport" className="hover:text-primary">My Import</NavLink>
      </li>
      <li className="text-base-content font-semibold">
        <NavLink to="/addExport" className="hover:text-primary">Add Export</NavLink>
      </li>
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
    <div className="navbar bg-base-100 shadow-lg border-b border-base-300">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl text-base-content">
          Export <span className="text-primary">Import</span> Hub
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Theme Toggle & User Section */}
      <div className="navbar-end">
        {/* Theme Toggle */}
        <label className="swap swap-rotate mr-4">
          <input
            type="checkbox"
            className="theme-controller"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={localStorage.getItem('theme') === "dark"}
          />
          
          {/* Sun icon */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
          
          {/* Moon icon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        </label>

        <div className="flex items-center gap-2">
          {/* User Avatar */}
          {user && (
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/WchFhLg/user.png"}
                  alt={user.displayName || "User"}
                  title={user.email}
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





// All Products.jsx

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

const AllProducts = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(false);
  // console.log(data);

   useEffect(() => {
      document.title = "All Products";
    }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    console.log(search_text);
    setLoading(true);

    fetch(`http://localhost:3000/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
        setLoading(false);
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
    <div>
      <div className="text-2xl text-blue-800 text-center font-bold mt-4 ">
        All Products
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center mt-3 mb-4"
      >
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn btn-primary mr-1">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;



// latestProducts.jsx

import React from 'react';
import { Link } from 'react-router';

const LatestProduct = ({product}) => {
    const {_id,productName,productImage,price,originCountry,rating,availableQuantity}=product;
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 h-full flex flex-col">
  {/* Image Section */}
  <figure className="px-4 pt-4 relative overflow-hidden group">
    <img
      src={productImage}
      alt={productName}
      className="rounded-xl w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
    />
    {/* Rating Badge */}
    <div className="absolute top-6 right-6 bg-warning text-warning-content px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg">
      ⭐ {rating}
    </div>
    {/* Stock Badge */}
    {availableQuantity < 10 && (
      <div className="absolute top-6 left-6 bg-error text-error-content px-3 py-1 rounded-full font-semibold text-xs shadow-lg">
        Only {availableQuantity} left!
      </div>
    )}
  </figure>
  
  {/* Content Section */}
  <div className="card-body flex-grow p-6">
    {/* Title */}
    <h2 className="card-title text-xl font-bold text-base-content line-clamp-2 min-h-[3.5rem]">
      {productName}
    </h2>
    
    {/* Info Grid */}
    <div className="space-y-3 my-4">
      {/* Price */}
      <div className="flex justify-between items-center bg-success/10 p-3 rounded-lg border border-success/20">
        <span className="text-base-content/70 font-medium">Price</span>
        <span className="text-2xl font-bold text-success">${price}</span>
      </div>
      
      {/* Origin & Stock */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-info/10 p-3 rounded-lg text-center border border-info/20">
          <p className="text-xs text-base-content/60 mb-1">Origin</p>
          <p className="font-semibold text-base-content text-sm">{originCountry}</p>
        </div>
        <div className="bg-secondary/10 p-3 rounded-lg text-center border border-secondary/20">
          <p className="text-xs text-base-content/60 mb-1">Stock</p>
          <p className="font-semibold text-base-content text-sm">{availableQuantity} units</p>
        </div>
      </div>
    </div>
    
    {/* Button */}
    <div className="card-actions w-full mt-auto">
      <Link to={`/product-details/${_id}`} className="btn btn-primary w-full hover:scale-105 transition-transform duration-200 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        See Details
      </Link>
    </div>
  </div>
</div>
    );
};

export default LatestProduct;






//backend

// post for database

    // app.post("/products", async (req, res) => {
    //   const data = req.body;
    //   console.log(data);
    //   const result = await productCollection.insertOne(data);

    //   res.send({
    //     success: true,
    //     result,
    //     insertedId: result.insertedId,
    //   });
    // });






    //   const handleRegister = (e) => {
    //   e.preventDefault();
    //   const form = e.target;
    //   const name = form.name.value;
    //   const email = form.email.value;
    //   const imageFile = form.photo.files[0];
    //   const password = form.password.value;
    
    //   // Password validation
    //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    
    //   if (!passwordRegex.test(password)) {
    //     toast.error(
    //       "Password must be at least 6 characters with uppercase and lowercase letters"
    //     );
    //     return;
    //   }
    
    //   // 🔐 Create Firebase User
    //   createUser(email, password)
    //     .then((result) => {
    //       const user = result.user;
    
    //       // ✅ SAVE USER TO MONGODB (VERY IMPORTANT)
    //       fetch("http://localhost:3000/users", {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           name,
    //           email,
    //         }),
    //       });
    
    //       toast.success("Registration Successful! Please login.");
    //       form.reset();
    //       navigate("/login");
    //     })
    //     .catch((error) => {
    //       toast.error(error.message);
    //     });
    // };
    

