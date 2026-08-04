import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image: {
        type: String
    },
    caption: {
        type: String
    }
})

const postModel = mongoose.model("posts", postSchema)

export default postModel