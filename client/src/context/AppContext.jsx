import { createContext, useEffect, useState} from "react";
import { serverUrl } from "../services/serverUrl";
import { getAuthStateApi, getUserDataApi } from "../services/allAPI";
import { toast } from "react-toastify";
export const AppContext=createContext()

export const AppContextProvider=(props)=>{

    const backendUrl=serverUrl
    const[isLoggedin,setIsloggedin]=useState(false)
    const[userData,setUserData]=useState(false)//userData is expected to be either false (no user data) or an object with user info

    const getUserData=async()=>{
        try {
            const {data}= await getUserDataApi(backendUrl)
            console.log(data);
            if(data.success){
                console.log(data.userData);
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        }
    }

    const getAuthState=async()=>{
        try {
            const {data}=await getAuthStateApi(backendUrl)
            if(data.success){
                setIsloggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState()
    },[])

    const value={
        backendUrl,
        isLoggedin,setIsloggedin,
        userData,setUserData,
        getUserData
    }

     return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
     )
}
