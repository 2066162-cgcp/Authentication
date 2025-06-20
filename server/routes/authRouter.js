import express from 'express';
import { alreadyAuthenticated, login, logout, register, resetUserPassword, sendResetOtp, sendVerificationOtp, verifyEmailWithOtp } from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter=express.Router();

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/send-verify-otp',userAuth,sendVerificationOtp)
authRouter.post('/verify-email-otp',userAuth,verifyEmailWithOtp)
authRouter.get('/already-auth',userAuth,alreadyAuthenticated)
authRouter.post('/send-reset-otp',sendResetOtp)
authRouter.post('/reset-password',resetUserPassword)


export default authRouter;