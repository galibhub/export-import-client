import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
        <ToastContainer
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          // Default options
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          // Success toast styling
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
              color: '#fff',
              border: '1px solid #059669',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          // Error toast styling
          error: {
            duration: 5000,
            style: {
              background: '#ef4444',
              color: '#fff',
              border: '1px solid #dc2626',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>
);
