import postModel from "../models/post.model.js"
import uploadFile from "../services/storage.service.js"
import userModel from "../models/user.model.js"
import config from "../config/config.js"
import jwt from 'jsonwebtoken'


export async function createpost(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({
                message: "user not loggedIn",
                success: false
            })
        }
        const token = authHeader.split(" ")[1]
        const decode = jwt.verify(token, config.JWT_SECRET)

        const user = await userModel.findById(decode.id)
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "image is required",
                success: false
            })
        }

        const result = await uploadFile(req.file.buffer)
        const post = await postModel.create({
            user: user._id,
            image: result.url,
            caption: req.body.caption
        })
        user.post.push(post._id)
        await user.save()
        res.status(201).json({
            message: "post created successfully",
            success: true,
            data: post
        })
    } catch (error) {
        res.status(401).json({ message: "invalid or expired token", success: false })
    }
}
export async function getpost(req, res) {
       const posts = await postModel.aggregate([{ $sample: { size: 10 } }])
    // const post = await postModel.find().populate("user", "username")
        const populatedPosts = await postModel.populate(posts, {path: "user",select: "username" })
    res.status(200).json({
        message: "Post Send",
        success: true,
        data: populatedPosts
    })
}

export async function deletePost(req,res) {
    const deletpostId=req.params.id
     if (!deletpostId ) {
        return res.status(404).json({ 
            message: "Post not found",
            success: false, 
        })
    }
    await postModel.findByIdAndDelete(deletpostId)
     res.status(200).json({
        message:"Post Delete Successfully",
        success: true,
    })
}