import userModel from "../models/userModel.js";

//get user details in other page after login
export const userController=async(req,res)=>{
    try {
        const{userId}=req.body
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        return res.json({success:true,
                         userData:{
                           name:user.name,
                           isAccountVerified:user.isAccountVerified 
                         },
                         message:"Account Verified"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}