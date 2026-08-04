import dotenv from 'dotenv'
dotenv.config()




const config={
    port:process.env.PORT,
    DB_URI:process.env.MONGO_DB_URI,
    IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY
}

export default config