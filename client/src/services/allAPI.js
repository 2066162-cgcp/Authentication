import { commonAPI } from "./commonAPI"

export const registerApi=async(backendUrl,reqBody)=>{
    return await commonAPI('POST',`${backendUrl}/api/auth/register`,reqBody,"")
}

export const loginApi=async(backendUrl,reqBody)=>{
    return await commonAPI('POST',`${backendUrl}/api/auth/login`,reqBody,"")
}

export const getUserDataApi=async(backendUrl)=>{
    return await commonAPI('GET',`${backendUrl}/api/user/getUserData`,"","")
}

export const getAuthStateApi=async(backendUrl)=>{
    return await commonAPI('GET',`${backendUrl}/api/auth/already-auth`,"","")
}

export const logoutApi=async(backendUrl)=>{
    return await commonAPI('POST',`${backendUrl}/api/auth/logout`,{},"")
}

export const sendVerificationOtpApi=async(backendUrl)=>{
    return await commonAPI('POST',`${backendUrl}/api/auth/send-verify-otp`,{},"")
}

export const VerifyEmailOtpApi=async(backendUrl,reqBody)=>{
    return await commonAPI('POST',`${backendUrl}/api/auth/verify-email-otp`,reqBody,"")//reqBody=otp
}