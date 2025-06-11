import express from "express";
import { userController } from "../controller/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter=express.Router();

userRouter.get('/getUserData',userAuth,userController)

export default userRouter;