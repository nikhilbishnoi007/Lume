import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    image: {
        type: String
    },
    caption: {
        type: String
    }
})

const postModel = mongoose.model("posts", postSchema)

export default postModel