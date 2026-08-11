import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import otpModel from "../models/otp.model.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import config from "../config/config.js";
import { genrateOTP, getOtpHtml } from "../utils/utils.js";
import { sendEmail } from "../services/email.service.js";
import { userInfo } from "os";
import uploadFile from "../services/storage.service.js";

export async function register(req, res) {
    const { username, email, password } = req.body
    const isAlreadyRegister = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (isAlreadyRegister) {
        return res.status(409).json({
            message: "user already register",
            success: false
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await userModel.create({
        username,
        email,
        password: hash,
    })
    const otp = genrateOTP()
    const html = getOtpHtml(otp)
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex")
    await otpModel.create({
        email,
        user: user._id,
        otpHash
    })
    sendEmail(email, "OTP Verification", `Your Otp Code is ${otp}`, html)
    res.status(201).json({
        message: "User registerd Successfully",
        success: true,
        data: user
    })

}
export async function otpverification(req, res) {
    const { otp } = req.body
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex")
    const otpdoc = await otpModel.findOne({ otpHash })
    if (!otpdoc) {
        return res.status(401).json({
            message: "Invalid Otp",
            success: false
        })
    }
    const user = await userModel.findByIdAndUpdate(otpdoc.user, {
        verified: true,
    })
    await otpModel.deleteMany({
        user: otpdoc.user
    })
    res.status(200).json({
        message: "email verified successfully",
        success: true,
    })

}
export async function login(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(401).json({
            message: "email or password is wrong",
            success: false
        })
    }
    if (!user.verified) {
        return res.status(401).json({
            message: "email not verified",
            success: false
        })
    }
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        return res.status(401).json({
            message: "email or password is wrong"
        })
    }
    const refreshtoken = jwt.sign({ email: user.email, id: user._id }, config.JWT_SECRET, { expiresIn: "7d" })
    const refreshTokenHash = crypto.createHash("sha256").update(refreshtoken).digest("hex")
    res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accesstoken = jwt.sign({ email: user.email, id: user._id, sessionId: session._id }, config.JWT_SECRET, { expiresIn: "15m" })
    res.status(201).json({
        message: "User loggedin Successfully",
        success: true,
        data: user,
        accesstoken
    })
}
export async function getuser(req, res) {
    const token = req.cookies.refreshtoken
    if (!token) {
        return res.status(401).json({
            message: "user not logged in",
            success: false
        })
    }
    const decoded = jwt.verify(token, config.JWT_SECRET)
    if (!decoded) {
        return res.status(401).json({
            message: "invalid token",
            success: false
        })
    }
    const user = await userModel.findById(decoded.id).populate("post", "image caption")
    res.status(200).json({
        message: "User found",
        success: true,
        data: user
    })
}
export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshtoken
    if (!refreshToken) {
        return res.status(401).json({
            message: "user not loggedin",
            success: false
        })
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
    
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if (!session) {
        return res.status(401).json({
            message: "Invalid refreshToken",
            success: false
        })
    }
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return res.status(404).json({
            message: "user not found",
            success: false
        })
    }
    const accesstoken = jwt.sign({ email: decoded.email, id: decoded.id }, config.JWT_SECRET, { expiresIn: "15m" })
    const newrefreshToken = jwt.sign({ email: decoded.email, id: decoded.id }, config.JWT_SECRET, { expiresIn: "7d" })
    const newrefreshTokenHash = crypto.createHash("sha256").update(newrefreshToken).digest("hex")
    session.refreshTokenHash = newrefreshTokenHash
    await session.save()
    res.cookie("refreshtoken", newrefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
        message: "new refreshtoken and accessToken genrated",
        success: true,
        data: user,
        accesstoken
    })
}
export async function getuserpost(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: "user not loggedin", success: false })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, config.JWT_SECRET)

        const user = await userModel.findById(decoded.id).populate("post", "image caption")
        if (!user) {
            return res.status(404).json({ message: "user not found", success: false })
        }

        res.status(200).json({
            message: "User post send",
            success: true,
            data: user
        })
    } catch (error) {
        res.status(401).json({ message: "invalid or expired token", success: false })
    }
}

export async function checkauth(req,res) {
    const token=req.cookies.refreshtoken
    if(!token){
        res.status(401).json({
            message:"user not loggedin",
            success:false
        })
    }
    const decoded=jwt.verify(token,config.JWT_SECRET)
    const user=await userModel.findById(decoded.id)
    if(!user){
        res.status(401).json({
            message:"user not found",
            status:false
        })
    }
    res.status(200).json({
        message:"user loggedin",
        success:true,
        data:user
    })
}


export async function logout(req, res) {
    const refreshToken = req.cookies.refreshtoken
    if (!refreshToken) {
        return res.status(401).json({
            message: "User Not loogedin",
            success: false
        })
    }
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if (!session) {
        return res.status(401).json({
            message: "invalid Token",
            success: false
        })
    }
    session.revoked = true
    await session.save()
    res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.status(200).json({
        message: "logout sucessfull",
        success: true
    })
}

export async function logoutall(req, res) {
    const refreshToken = req.cookies.refreshtoken
    if (!refreshToken) {
        return res.status(400).json({
            message: "you must be loggedin",
            success: false
        })
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)
    await sessionModel.updateMany({
        user: decoded.id,
        revoked: false
    }, {
        revoked: true
    })
    res.clearCookie("refreshtoken")
    res.status(200).json({
        message: "logout from all devices",
        success: true
    })

}

