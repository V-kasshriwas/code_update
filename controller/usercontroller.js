import User from "../Model/usermodel.js";
import "../Model/association.js";
import jwt from "jsonwebtoken"


export const signUp=async (req,res,next)=>{
           try{
                const {username,email,password,bio,gender} = req.body;
                console.log(username);
                console.log("this is working right now");
                console.log(password);
                let user = await User.create({username,email,password,bio,gender});
                if(user){
                  console.log(user);
                  return res.status(200).json({message:"signup succesfully",user});
                }else{
                  return res.status(201).json({message:"signUp failed"})
                }
           }catch(err){
            console.log(err);
           }
}

export const signIn = async (req,res,next)=>{
  const {email,password}=req.body
  try{
    if(!email||!password)
      return res.status(401).json({message:"something is missing please check"});


    let user = await User.findOne({where:{email}});
    if(user)
      var result = await User.checkPassword(password,user.password)
   
    console.log(user)
    return res.status(200).json({message:"signIn succesfully" ,user})



    return res.status(201).json({message:"user not found"})

  // if(result)
  //   var payload = {subject:req.body.email}
  // var token = await jwt.sign(payload,"asdfghvikas",{expiresIn:'1d'});
  // console.log(token);
  // return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({message:`Welcome Back ${user.username}`})
  // res.status(200).json({message:"sign in success"})


       res.status(401).json({error:"Bad request|invalid password"});   
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"internal server error"},err)
  }
}

export const searchUser = async(req,res)=>{
  try{
    const {username} = req.body;
    const user = await User.findAll({where:{username:username},attributes:['username','profilepicture','id','gender']})
     if(user.length>0)
      return res.status(200).json({message:"user found",user:user.map(user=>({
        username: user.username,
        profilePicture: user.profilePicture,
        userId: user.id,  // Assuming the id field corresponds to the user ID
        gender: user.gender
    }))})

  }catch(err){
    console.log(err);
    return res.status(401).json({message:"internal server",err})
  }
}