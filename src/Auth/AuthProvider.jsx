
import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import UAParser from 'ua-parser-js';

export const AuthContext = createContext(null) ;

const AuthProvider = ({children}) => {

    const axiosSecure = useAxiosSecure() ;
    const [user , setUser] = useState(null) ;
    const [loading , setLoading] = useState(true) ;
    const parser = new UAParser();
    const deviceInfo = parser.getResult();

    const createUser = (email , pass) => {
        setLoading(true) ;
        return createUserWithEmailAndPassword(auth , email , pass) ;
    }

    const setProfile = (name , photo) => {
        setLoading(true) ;
        return updateProfile(auth.currentUser , {
            displayName : name ,
            photoURL : photo ,
        })
    }

    const signIn = (email , pass) => {
        setLoading(true) ;
        return signInWithEmailAndPassword(auth , email , pass) ;
    }

    const googleLogin = () => {
        setLoading(true) ;
        const googleProvider = new GoogleAuthProvider() ; 
        return signInWithPopup(auth , googleProvider) ;
    }
    
    const githubLogin = () => {
        setLoading(true) ;
        const gitHubProvider = new GithubAuthProvider() ;
        return signInWithPopup(auth , gitHubProvider) ;
    }
    
    const logOut = () => {
        setLoading(true) ;
        return signOut(auth) ;
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth , (currentUser) => {
            setLoading(false) ;
            setUser(currentUser) ;
            if(currentUser){

                // axiosSecure.put('/jwt' , {email : currentUser?.email})
                // .then((result) => {
                //     console.log(result)
                // })

                const userInfo = {
                    email : currentUser?.email ,
                    devicesInfo : {
                        deviceName : deviceInfo?.os?.name +' '+deviceInfo?.os?.version ,
                        loginDate : new Date().toLocaleDateString() ,
                        loginTime : new Date().toLocaleTimeString() ,
                        loginShift : new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).split(' ')[1] ,
                        isRemoved : false ,
                    },
                }

                axiosSecure.put('/updateDevice' , userInfo)
                .then((result) => {
                    return result ;
                })

            }
        })
        return unSubscribe ;
    } , [axiosSecure , deviceInfo])

    const authInfo = {
        user ,
        logOut,
        signIn ,
        loading ,
        setProfile,
        createUser ,
        githubLogin ,
        googleLogin ,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
