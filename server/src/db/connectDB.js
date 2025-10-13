import mongoose from "mongoose"
import { MONGO_DB_URI } from "../config/envConfig.js";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // mongoose.connection.on("connected")
         await mongoose.connect(`${MONGO_DB_URI}/${DB_NAME}`)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

export default connectDB