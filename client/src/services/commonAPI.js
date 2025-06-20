import axios from 'axios';

axios.defaults.withCredentials = true;//It tells Axios to send cookies (like auth tokens, session cookies) with cross-origin requests, or requests that need to maintain login sessions between your frontend and backend.

export const commonAPI=async (httpReq, url, reqBody, reqHeader)=>{
    const reqConfig = {
        method:httpReq,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }

    return await axios(reqConfig).then(result=>{
        return result
    }).catch(error=>{
        return error.response ? error.response.data : { success: false, message: error.message }
    })
}