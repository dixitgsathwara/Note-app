const asyncHandler =require ("express-async-handler");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const User =require("../Models/userModel");


const userRegister = asyncHandler(async (req,res)=>{
  const {fullName,email,password}=req.body;
  if(!fullName){
    return res.status(400).json({error:true,message:"fullName is required"});
  }
  if(!email){
    return res.status(400).json({error:true,message:"email is required"});
  }
  if(!password){
    return res.status(400).json({error:true,message:"password is required"});
  }
  const isUser= await User.findOne({email:email});
  if(isUser){
    return res.json({error:true,message:"User already exist"});
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user=new User({
    fullName,
    email,
    password: hashPassword,
  });
  await user.save();
  const accesstoken = jwt.sign(
    {user},
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
    );
  return res.status(200).json({
    error:false,
    user,
    accesstoken,
    message:"Registration Successfully"
  })
});


const userLogin = asyncHandler(async (req,res)=>{
  const {email,password}=req.body;
  if(!email){
    return res.status(400).json({error:true,message:"email is required"});
  }
  if(!password){
    return res.status(400).json({error:true,message:"password is required"});
  }
  const isUser= await User.findOne({email:email});
  if(!isUser){
    return res.json({error:true,message:"User does not exist with this email"});
  }
  if(isUser && (await bcrypt.compare(password, isUser.password))){
    const user={user : isUser}
    const accesstoken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
      );
    return res.status(200).json({
      error:false,
      isUser,
      accesstoken,
      message:"Login Successfully"
    })
  }
  else{
    return res.status(400).json({
      error:true,
      message:"Password does not match with exist user"
    })
  }
});


const getUser = asyncHandler(async (req,res)=>{
  const {user}=req.user;
  const isUser = await User.findOne({_id:user._id});
  if(!isUser){
    res.sendStatus(401);
  }
  return res.status(200).json({
      user:{
        fullName:isUser.fullName,
        email:isUser.email,
        _id:isUser._id,
        createdOn:isUser.createdOn
      },
      message:""
  })
});
module.exports = { userRegister,userLogin,getUser};
