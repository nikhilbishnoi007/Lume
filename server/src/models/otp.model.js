import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
     email:{
        type:String
    },
    otpHash:{
        type:String,
        required:true
    },
   
},{
    timestamps:true
})

const otpModel=mongoose.model("otps",otpSchema)

export default otpModel