import  { createContext, useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../services/firebase';
const provider = new GoogleAuthProvider();
import {Navigate} from 'react-router-dom'

export const AuthGoogleContext = createContext({})


export const AuthGoogleProvider = ({children})=> {

const [user,setUser]= useState(null);
const auth = getAuth(app);

useEffect(()=>{
    const loadStorageAuth =()=>{
        const sessionToken = sessionStorage.getItem('@Authfirebase:token');
        const sessionUser = sessionStorage.getItem('@Authfirebase:user');
        if(sessionToken && sessionUser){
            setUser(sessionUser)
        }
    }
    loadStorageAuth();
},[])

    function signingoogle(){
   
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user);

            console.log(user);
            console.log(token);

            sessionStorage.setItem("@Authfirebase:token",token);
            sessionStorage.setItem("@Authfirebase:user",JSON.stringify(user));
        
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          })
          }

function SignOut(){
    sessionStorage.clear();
    setUser(null);
    return <Navigate to='/'/>
}
          return (
            <AuthGoogleContext.Provider value={{signingoogle, user, signed: !!user,SignOut}}>
              {children}
            </AuthGoogleContext.Provider>
          )
        


}


