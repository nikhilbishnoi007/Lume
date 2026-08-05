import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'

const authRouter=Router()

authRouter.post("/register",authController.register)
authRouter.post("/otp-verification",authController.otpverification)
authRouter.post("/login",authController.login)
authRouter.get("/getuser",authController.getuser)
authRouter.get("/refreshToken",authController.refreshToken)

export default authRouter