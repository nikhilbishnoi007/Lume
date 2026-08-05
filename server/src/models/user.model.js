import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }]
})

const userModel=mongoose.model("users",userSchema)

export default userModel