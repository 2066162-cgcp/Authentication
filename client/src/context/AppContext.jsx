import { createContext, useEffect, useState } from "react";
import { serverUrl } from "../services/serverUrl";
import { getAuthStateApi, getUserDataApi } from "../services/allAPI";
import { toast } from "react-toastify";

// 1️⃣ Create a context object
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // 2️⃣ Constants + states
  const backendUrl = serverUrl;  // Your server base URL, shared globally

  const [isLoggedin, setIsloggedin] = useState(false); 
  // To track if user is logged in

  const [userData, setUserData] = useState(false); 
  // To store user info (name, isAccountVerified, etc.)

  // 3️⃣ Function: Fetch user details
  const getUserData = async () => {
    try {
      const { data } = await getUserDataApi(backendUrl); 
      console.log(data);
      if (data.success) {
        console.log(data.userData);
        setUserData(data.userData); 
        // Save user info in context
      } else {
        toast.error(data.message); 
        // Show error if API failed
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // 4️⃣ Function: Check auth state on app load (or refresh)
  const getAuthState = async () => {
    try {
      const { data } = await getAuthStateApi(backendUrl);
      if (data.success) {
        setIsloggedin(true); 
        // Mark user as logged in
        getUserData(); 
        // Fetch user info
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 5️⃣ useEffect: Check login status once on app load
  useEffect(() => {
    getAuthState();
  }, []);

  // 6️⃣ Provide the context values
  const value = {
    backendUrl,
    isLoggedin,
    setIsloggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
      {/* Make these values available to any component wrapped inside AppContextProvider */}
    </AppContext.Provider>
  );
};
