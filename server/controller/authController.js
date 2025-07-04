import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, RESET_PASSWORD_TEMPLATE } from "../config/emailTemplate.js";


export const register= async(req,res)=>{
    const {name,email,password}=req.body

    if(!name || !email || !password){
        return res.json({success:false,message:"please fill the credentials"})
    }
    try {
        const existUser= await userModel.findOne({email})

    if(existUser){
        return res.json({success:false,message:"User already exist"})
    }
    const encryptPwd=await bcrypt.hash(password,10)

    const user=new userModel({
        name,
        email,
        password:encryptPwd
    })
    await user.save()

    const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'7d'})

    res.cookie('token',token,{
        httpOnly:true, //This is always true — it prevents JavaScript on the client from accessing the cookie (more secure).
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 //when the cookie expires. converted into milli seconds
    })
// In development, use:
// secure: false=> http
// sameSite: 'strict'=> same site like aris.na.novartis/airs and aris.na.novartis/createAEpage

// In production (real website), use:
// secure: true=>https
// sameSite: 'none'=> it allows to cotact upstream and downstream application/API's
// Make sure both frontend and backend are HTTPS

    const mailOption={
        from: process.env.SENDER_MAIL,
        to: email,
        subject: "Welcome to Startup",
        text: `You have successfully logged into the application with user id: ${email}`
    }

    await transporter.sendMail(
        mailOption
    )
    return res.json({success:true,message:"user registered"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const login=async (req,res)=>{
    const{email,password}=req.body

    if(!email || !password){
        return res.json({success:false,message:"fill the credentials"})
    }

    try {
        const user=await userModel.findOne({email})
        if(!user){
           return  res.json({success:false,message:`no such ${user.email} exiset`})
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:`password is not correct`})
        }
        
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'7d'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        return res.json({success:true,message:"user can login"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict'
        })
        res.json({success:true,message:"logged out"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const sendVerificationOtp=async(req,res)=>{
     try {
        const{userId}=req.body
        const user = await userModel.findById(userId)

        if(user.isAccountVerified){
            return res.json({success:false,message:"account is already verified"})
        }

        const otp=String(Math.floor(100000+Math.random()*900000))

        user.verifyOtp=otp
        user.verifyOtpExpireAt=Date.now() +24*60*60*1000

        await user.save()

        const mailOption={
            from:process.env.SENDER_MAIL,
            to:user.email,
            subject:'Verify the OTP',
            // text:`The otp is ${otp}. Please verify your mail using this OtP.`,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }
        
        await transporter.sendMail(mailOption)

        return res.json({success:true,message:"verification mail send successfully"})

    } catch(error) {
        res.json({success:false,message:error.message})
    }
}

export const verifyEmailWithOtp=async(req,res)=>{
    const {userId,otp}=req.body

    if(!userId || !otp){
        return res.json({success:false,message:"Missing credentials"})
    }
    try {
        const user=await userModel.findById(userId)
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        if(user.verifyOtp==='' || user.verifyOtp!==otp){
            return res.json({success:false,message:"OTP is incorrect"})
        }
        if(user.verifyOtpExpireAt<Date.now()){
            return res.json({success:false,message:"OTP is expired"})
        }
        
        user.isAccountVerified=true
        user.verifyOtp=''
        user.verifyOtpExpireAt=0

        await user.save()
        return res.json({success:true,message:"Email verified successfully"})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const alreadyAuthenticated=async(req, res)=>{
    try {
        res.json({success:true,message:"account already authenticated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const sendResetOtp=async(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.json({success:false,message:"Please fill the email id"})
    }

    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const otp=String(Math.floor(100000+Math.random()*900000))

        user.resetOtp=otp
        user.resetOtpExpireAt=Date.now()+15*60*1000

        await user.save()

        const mailOption={
            from:process.env.SENDER_MAIL,
            to:user.email,
            subject:'Reset password using OTP',
            text:`The otp is ${otp}. Please reset your password using this otp.`,
            html:RESET_PASSWORD_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }
        
        await transporter.sendMail(mailOption)

        return res.json({success:true,message:"Password reset mail send successfully"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const resetUserPassword=async(req,res)=>{
    const{email,otp,newPassword}=req.body
        if(!email || !otp || !newPassword){
            return res.json({success:false,message:"Please fill the credentials"})
        }
    try {
        const user= await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"No such user exist"})
        }
        if(user.resetOtp='' || user.resetOtp!==otp){
            return res.json({success:false,message:"OTP is invalid"})
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP is expired"})
        }

        const encryptPwd= await bcrypt.hash(newPassword,10)

        user.password=encryptPwd
        user.resetOtp=''
        user.resetOtpExpireAt=0
        await user.save();

        return res.json({success:true,message:"Password reset successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}