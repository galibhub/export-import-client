import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../components/AllProducts/AllProducts";
import Home from "../components/Home/Home";
import RootLayout from "../layout/RootLayout";
import MyImport from "../components/MyImport/MyImport";
import MyExport from "../components/MyExport/MyExport";
import AddExport from "../components/AddExport/AddExport";
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
      },
      {
        path: "/allProducts",
        element: <AllProducts />
      },
      {
        path:'/myImport',
        element: <PrivetRoute>
          <MyImport />
        </PrivetRoute>
      },
      {
        path:'/myExport',
        element:<PrivetRoute>
          <MyExport></MyExport>
        </PrivetRoute>
      },
      {
        path:'/addExport',
        element:<PrivetRoute>
          <AddExport></AddExport>
          </PrivetRoute>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ],
  },
]);

export default router;