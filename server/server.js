import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app=express();
const port=process.env.PORT || 4000
connectDB();

app.use(express.json())//request will be parsed using json
app.use(cookieParser())
app.use(cors({credentials:true}))//send cookies in the response from express

app.get('/',(req,res)=>res.send("API working..."))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})