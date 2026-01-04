

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const popUpLoginIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const LogOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser?.email) {
        try {
        
          const res = await fetch(
            `https://export-server-alpha.vercel.app/users/role/${currentUser.email}`
          );
          
          if (res.ok) {
            const data = await res.json();
            setRole(data.role); 
          } else {
             // Fallback if API is down but Firebase works
             setRole("user"); 
          }
        } catch (error) {
          console.error("Failed to fetch user role:", error);
          setRole("user"); // Default role on error
        }
      } else {
        setRole(null);
      }
      
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    auth,
    role, 
    user,
    setUser,
    createUser,
    LogOut,
    signIn,
    popUpLoginIn,
    loading,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;