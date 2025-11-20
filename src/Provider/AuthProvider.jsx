import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();


const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false)

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn=(email,password)=>{
         setLoading(true)
       return signInWithEmailAndPassword(auth,email,password)
    }

    const popUpLoginIn=()=>{
         setLoading(true)
        return signInWithPopup(auth,provider)
    }



 const LogOut=()=>{
    return signOut(auth)
 }

    useEffect(()=>{
     const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
          setUser(currentUser)
           setLoading(false)
        });
        return ()=>{
        return unsubscribe();
        }
    },[])


    const authData = {
        auth,user,setUser,createUser,LogOut,signIn,popUpLoginIn,loading
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;