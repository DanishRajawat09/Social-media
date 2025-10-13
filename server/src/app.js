import express from "express"
import cors from "cors"
import { CORS_ORIGIN } from "./config/envConfig.js"

const app = express()


app.use(express.json({limit : "16kb"}))
app.use(cors({origin : CORS_ORIGIN , credentials : true})) // cross origin resource sharing
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

export default app