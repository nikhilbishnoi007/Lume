import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'

const authRouter=Router()

authRouter.post("/register",authController.register)
authRouter.post("/otp-verification",authController.otpverification)
authRouter.post("/login",authController.login)
authRouter.get("/getuser",authController.getuser)
authRouter.get("/refreshToken",authController.refreshToken)
authRouter.get("/logout",authController.logout)
authRouter.get("/logout-all",authController.logoutall)
authRouter.get("/getuserpost",authController.getuserpost)

export default authRouter