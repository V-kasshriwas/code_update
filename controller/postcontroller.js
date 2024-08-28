import Posts from "../Model/postmodel.js"

export const PostPhotos = async (req,res,next)=>{
    const {caption,image,author,totallikes,comments} = req.body
    try{
    const post =await Posts.create({caption,image,author,totallikes,comments})
    if(post)
        return res.status(200).json({message:"post created succesfully",post});
    

    return res.status(400).json({message:"post unsuccesfull"})
}catch(err){
    console.log(err);
    return res.status(400).json({message:"internal server error",err})
}
}