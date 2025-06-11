import mongoose from "mongoose";

const connectDB= async()=>{
    mongoose.connection.on('connected',()=>{ //to show DB connected 
        console.log("database connected successfully");
    })
    await mongoose.connect(`${process.env.database}/mern`) //connect to DB and db name is mern-auth
}

export default connectDB;