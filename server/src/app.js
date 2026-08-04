import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import restRouter from './routes/rest.routes.js'

const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/rest",restRouter)

app.get("/",(req,res)=>{
    res.send("server is running")
})

export default app