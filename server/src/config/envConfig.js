import dotenv from "dotenv"

dotenv.config({path : `.env.${process.env.NODE_ENV || "development"}.local`})

export const {PORT , MONGO_DB_URI , CORS_ORIGIN , NODE_ENV , JWT_ACCESSTOKEN_SECRET , JWT_ACCESSTOKEN_EXPIRY , JWT_REFRESHTOKEN_SECRET , JWT_REFRESHTOKEN_EXPIRY} = process.env