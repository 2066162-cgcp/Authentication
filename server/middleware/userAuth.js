import jwt from "jsonwebtoken";

const userAuth=(req,res,next)=>{
    const {token}=req.cookies

    if(!token){
        return res.json({success:false,message:"Not an authorized user. Please login again"})
    }

    try {
        const tokenDecode=jwt.verify(token,process.env.SECRET_KEY)
        if(tokenDecode.id){
            // req.body.userId=tokenDecode.id
            req.body = req.body || {}; 
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({success:false,message:"Not an authorized user. Please login again"})
        }
        next();
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}

export default userAuth;