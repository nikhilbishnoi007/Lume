import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import otpModel from "../models/otp.model.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import config from "../config/config.js";
import { genrateOTP,getOtpHtml } from "../utils/utils.js";
import { sendEmail } from "../services/email.service.js";

export async function register(req, res) {
    const { username, email, password } = req.body
    const isAlreadyRegister=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isAlreadyRegister){
        return res.status(409).json({
            message:"user already register",
            succcess:false
        })
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)


}