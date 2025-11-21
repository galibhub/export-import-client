import { createBrowserRouter } from "react-router-dom";
import AddExport from "../components/AddExport/AddExport";
import AllProducts from "../components/AllProducts/AllProducts";
import Home from "../components/Home/Home";
import MyExport from "../components/MyExport/MyExport";
import UpdateExport from "../components/MyExport/UpdateExport";
import MyImport from "../components/MyImport/MyImport";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import RootLayout from "../layout/RootLayout";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://export-server-alpha.vercel.app/latest-products"),
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
        loader: () => fetch("https://export-server-alpha.vercel.app/products"),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivetRoute>
            <ProductDetails></ProductDetails>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://export-server-alpha.vercel.app/products/${params.id}`),
      },
      {
        path: "/updateExport/:id",
        element: (
          <PrivetRoute>
            <UpdateExport></UpdateExport>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://export-server-alpha.vercel.app/products/${params.id}`),
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/myImport",
        element: (
          <PrivetRoute>
            <MyImport />
          </PrivetRoute>
        ),
      },
      {
        path: "/myExport",
        element: (
          <PrivetRoute>
            <MyExport></MyExport>
          </PrivetRoute>
        ),
      },
      {
        path: "/addExport",
        element: (
          <PrivetRoute>
            <AddExport></AddExport>
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
