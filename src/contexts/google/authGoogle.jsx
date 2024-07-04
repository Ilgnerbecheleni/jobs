import  { createContext, useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../services/firebase';
const provider = new GoogleAuthProvider();
import {Navigate, useNavigate} from 'react-router-dom'

export const AuthGoogleContext = createContext({})


export const AuthGoogleProvider = ({children})=> {

const [user,setUser]= useState(null);
const [token , setToken]= useState(null)
const [uid , setUid]= useState(null)
const auth = getAuth(app);
const navigate = useNavigate();
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
           
           
            // The signed-in user info.
            const user = result.user;
            const token = user.accessToken;
            const uid = user.uid;
            setUser(user);
            setToken(user.accessToken)
            setUid(user.uid)
            // console.log(user.accessToken);
            // console.log(user);
            // console.log(user.uid);

            sessionStorage.setItem("@Authfirebase:token",token);
            sessionStorage.setItem("@Authfirebase:user",JSON.stringify(user));
            sessionStorage.setItem("@Authfirebase:uid",JSON.stringify(uid));
        
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
    return navigate('/')
}
          return (
            <AuthGoogleContext.Provider value={{signingoogle, user, signed: !!user,SignOut,uid}}>
              {children}
            </AuthGoogleContext.Provider>
          )
        


}


