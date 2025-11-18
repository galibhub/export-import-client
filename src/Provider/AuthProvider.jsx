import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);

    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn=(email,password)=>{
       return signInWithEmailAndPassword(auth,email,password)
    }




 const LogOut=()=>{
    return signOut(auth)
 }

    useEffect(()=>{
     const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
          setUser(currentUser)
        });
        return ()=>{
         unsubscribe();
        }
    },[])


    const authData = {
        auth,user,setUser,createUser,LogOut,signIn
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;