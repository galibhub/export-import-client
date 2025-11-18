import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";

const RootLayout = () => {
  return (
    <div>
  
      <Navbar></Navbar>
      <Outlet>
        <Home></Home>
      </Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
