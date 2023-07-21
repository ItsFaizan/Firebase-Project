import React, { useState } from 'react'
import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () =>{
         await createUserWithEmailAndPassword(auth, email, password); 
    }

    const signInwithGoogle = async () =>{
      await signInWithPopup(auth, googleProvider ); 
 }

 const logout = async () =>{
  await signOut(auth); 
}
  return (  
    <div>
        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}> Sign In</button>
        <button onClick={signInwithGoogle}> SignIn with Google </button>
        <button onClick={logout}> SignOut </button>
    </div>
  )
}
