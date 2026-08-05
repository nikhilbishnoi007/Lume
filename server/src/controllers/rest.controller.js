import postModel from "../models/post.model.js"
import uploadFile from "../services/storage.service.js"
import userModel from "../models/user.model.js"
import config from "../config/config.js"
import jwt from 'jsonwebtoken'


export async function createpost(req,res) {
    const token=req.cookies.refreshtoken
    if(!token){
        return res.status(401).json({
            message:"user not loggedIn",
            success:false
        })
    }
    const decode=jwt.verify(token,config.JWT_SECRET)
    const user=await userModel.findById(decode.id)
    const result =await uploadFile(req.file.buffer)
    const post=await postModel.create({
        user:user._id,
        image:result.url,
        caption:req.body.caption
    })
    res.status(201).json({
        message:"post created successfully",
        success:true,
        data:post
    })
}
export async function getpost(req,res){
    const post=await postModel.find()
    res.status(200).json({
        message:"Post Send",
        success:true,
        data:post
    })
}