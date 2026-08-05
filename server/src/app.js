import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import restRouter from './routes/rest.routes.js'
import authRouter from './routes/auth.routes.js'


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/api/rest", restRouter)
app.use("/api/auth",authRouter)

app.get("/", (req, res) => {
    res.send("server is running")
})

export default app