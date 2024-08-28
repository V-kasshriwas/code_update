import raw from "body-parser/lib/types/raw.js";
import profilePicture from "../Model/profilepicture.js";
import User from "../Model/usermodel.js";

export const profileImage =async (req,res,next)=>{
    try{
    const {profileid,profileURL} = req.body;
    const Dp =await profilePicture.create({profileid,profileURL});
    if(Dp)
        return res.status(200).json({message:"profile picture succesfully inserted",Dp})
}catch(err){
    console.log(err);
    return res.status(201).json({message:"profile updation failed",err})
}

   
}

// export const profileImageUpdation = async(req,res,next)=>{
//     try{
//        const {profileid,profileURL} =req.body

//        const result = await profilePicture.update({})
//     }catch(err){

//     }
// }
export const profileImageUpdation  =async (req,res,next)=>{
try {
    const { profileid, profileURL } = req.body;

    
    const result = await profilePicture.update(
        { profileURL },
        { where: { profileid } }
    );

    
    if (result[0] > 0) {
        res.status(200).json({ message: "Profile picture updated successfully." });
    } else {
        res.status(404).json({ message: "Profile not found or no changes made." });
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
}
}

export const AccessProfile = async (req, res, next) => {
    try {
    
      const { profileid } = req.body;
  
      if (!profileid) {
        return res.status(400).json({ message: "Profile ID is required" });
      }
  
      
      console.log(profileid);
  
      
      const result = await profilePicture.findOne({
        where: { profileid: profileid }
      });
  
    
      if (result) {
        return res.status(200).json({ message: "Profile accessed successfully", result });
      }
  
      return res.status(404).json({ message: "Profile not found" });
    } catch (err) {
      
      console.error(err);
      return res.status(500).json({ message: "Failed to access profile" });
    }
  };
