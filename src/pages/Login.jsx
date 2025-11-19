import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, popUpLoginIn } = use(AuthContext);
   
  const navigate=useNavigate();
  const location=useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log("sign In SuccessFull", user);
         toast.success("Login Successful!", {
          duration: 3000,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error Found", errorCode, errorMessage);
      });
    console.log({ email, password });
  };

  const handlePopUpLogin = () => {
    popUpLoginIn()
      .then((result) => {
        const user = result.user;
        console.log("Google Sign In Successful", user);
       toast.success("Login Successful!", {
          duration: 3000,
        });
         navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Google Login Error:", errorCode, errorMessage);
        alert(`Error: ${errorMessage}`);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-base-content leading-tight mb-6">
            LOG IN TO
            <br />
            YOUR EXPORT
            <br />
            <span className="text-success">IMPORT HUB.</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 underline font-semibold transition-colors"
            >
              Create one →
            </Link>
          </p>
        </div>

        {/* Right side - Login form */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300">
          <h2 className="text-3xl font-bold text-base-content mb-8 text-center">
            Login now!
          </h2>

          <form onSubmit={handleLogIn} className="space-y-6">
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
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-base-300 bg-base-200 text-base-content rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-primary-content py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-100 text-base-content/70">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handlePopUpLogin}
              className="btn btn-outline w-full border-base-300 hover:bg-base-200 hover:border-base-300"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>

          <p className="text-center text-sm text-base-content/70 mt-6">
            Don't have an Account?
            <Link
              to="/register"
              className="ml-1 text-primary font-bold hover:text-primary/80 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;