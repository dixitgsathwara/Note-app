const asyncHandler=require('express-async-handler');
const jwt=require("jsonwebtoken");
const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        if(!token){
          res.status(401);
          throw new Error("token is missing");
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            else{
                req.user=user;
                next();
            }
        });
    }
    else{
        throw new Error("User is not authorized");
    }
});
module.exports=validateToken;