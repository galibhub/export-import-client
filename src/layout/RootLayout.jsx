import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  const navigation=useNavigation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {navigation.state === "loading" && (
                 <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
            )}
            
            
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default RootLayout;