import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  const navigation=useNavigation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {navigation.state === "loading" && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-red-900 h-1">
                    <div className="h-full bg-red-900 animate-pulse"></div>
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