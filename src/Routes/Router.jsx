import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/Dashboard/DashboardLayout";

import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import ProductDetails from "../components/ProductDetails/ProductDetails";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";

// Dashboard pages
import UserDashboardHome from "../layout/Dashboard/User/UserDashboardHome";
import MyImport from "../layout/Dashboard/User/MyImport";
import MyExport from "../layout/Dashboard/User/MyExport";
import AddExport from "../layout/Dashboard/User/AddExport";

import AdminDashboardHome from "../layout/Dashboard/Admin/AdminDashboardHome";
import ManageUsers from "../layout/Dashboard/Admin/ManageUsers";
import ManageProducts from "../layout/Dashboard/Admin/ManageProducts";
import Profile from "../layout/Dashboard/User/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home />, loader: () => fetch("http://localhost:3000/latest-products") },
      { path: "allProducts", element: <AllProducts />, loader: () => fetch("http://localhost:3000/products") },
      { path: "product-details/:id", element: <ProductDetails />, loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`) },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // 🔐 DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      // USER
      { index: true, element: <UserDashboardHome /> },
      { path: "my-imports", element: <MyImport /> },
      { path: "my-exports", element: <MyExport /> },
      { path: "add-export", element: <AddExport /> },
      { path: "profile", element: <Profile /> },

      // ADMIN
      {
        path: "admin",
        element: <AdminRoute><AdminDashboardHome /></AdminRoute>,
      },
      {
        path: "admin/manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "admin/manage-products",
        element: <AdminRoute><ManageProducts /></AdminRoute>,
      },
    ],
  },
]);

export default router;
