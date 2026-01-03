import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://export-server-alpha.vercel.app/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => setRole(data.role));
    }
  }, [user]);

  if (loading || role === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
