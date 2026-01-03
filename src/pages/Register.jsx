import React, { use} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { uploadImage } from "../utils/uploadImage"

import { toast } from "react-toastify";

const Register = () => {
  const { createUser } = use(AuthContext); 
  const navigate = useNavigate(); 


const handleRegister = async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const imageFile = form.photo.files[0];

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be at least 6 characters with uppercase and lowercase letters"
    );
    return;
  }

  try {
    
    let photoURL = "";
    if (imageFile) {
      photoURL = await uploadImage(imageFile); 
    }

    
    const result = await createUser(email, password);
    const user = result.user;

  
    await updateProfile(user, {
      displayName: name,
      photoURL,
    });

   
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        photoURL,
      }),
    });

    toast.success("Registration Successful!");
    form.reset();
    navigate("/login");
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-base-content leading-tight mb-6">
            JOIN YOUR<br />
            EXPORT IMPORT<br />
            <span className="text-success">HUB TODAY.</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/80 underline font-semibold transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>

        {/* Right side - Register form */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300">
          <h2 className="text-3xl font-bold text-base-content mb-8 text-center">
            Create Account
          </h2>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-base-300 bg-base-200 text-base-content rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Email
              </label>
              <input
                type="email" 
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-base-300 bg-base-200 text-base-content rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="file-input file-input-bordered w-full bg-base-200"
              />
              <p className="text-xs text-base-content/60 mt-1">
                Upload your profile picture (optional)
              </p>
            </div>


            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-base-300 bg-base-200 text-base-content rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-primary-content py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-base-content/70 mt-6">
                    Already have an Account?
                      <Link
                        to="/login"
                        className="ml-1 text-primary font-bold hover:text-primary/80 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
                      >
                       Login Now
                      </Link>
                    </p>
        </div>
        
      </div>
    </div>
  );
};

export default Register;