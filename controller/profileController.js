import raw from "body-parser/lib/types/raw.js";
import profilePicture from "../Model/profilepicture.js";
import User from "../Model/usermodel.js";

export const profileImage =async (req,res,next)=>{
    try{
    const {profileid,profileURL} = req.body;
    const Dp =await profilePicture.create({profileid,profileURL});
    if(Dp)
        return res.status(200).json({message:"profile picture updated succesfully",Dp})
}catch(err){
    console.log(err);
    return res.status(201).json({message:"profile updation failed",err})
}

   
}
export const AccessProfile = async(req,res,next)=>{
    try {
        const { profileid } = req.body;
    
        // Corrected where clause
       const result = await profilePicture.findOne({where:profileid});
    
        if (result) {
            console.log(result);
            return res.status(200).json({ message: "Profile URL successfully accessed" ,result});
        }
    
        return res.status(404).json({ message: "Profile not found" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to access profile" });
    }
}
