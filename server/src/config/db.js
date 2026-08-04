import mongoose from "mongoose";
import config from "./config.js";

async function conectDb(){
    await mongoose.connect(config.DB_URI)
    console.log("Db is connected scuessfully")
}

export default conectDb