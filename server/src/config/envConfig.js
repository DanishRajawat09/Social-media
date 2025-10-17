import dotenv from "dotenv"

dotenv.config({path : `.env.${process.env.NODE_ENV || "development"}.local`})

export const {PORT , MONGO_DB_URI , CORS_ORIGIN , NODE_ENV} = process.env