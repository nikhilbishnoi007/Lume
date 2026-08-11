import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import * as restController from "../controllers/rest.controller.js"

const restRouter=Router()


restRouter.post("/create-post",upload.single("image"),restController.createpost)
restRouter.get("/get-post",restController.getpost)
restRouter.delete("/delete/:id",restController.deletePost)

export default restRouter