import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();


const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);

    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn=(email,password)=>{
       return signInWithEmailAndPassword(auth,email,password)
    }

    const popUpLoginIn=()=>{
        return signInWithPopup(auth,provider)
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
        auth,user,setUser,createUser,LogOut,signIn,popUpLoginIn
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;