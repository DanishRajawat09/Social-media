import app from "./app.js";
import { PORT } from "./config/envConfig.js";
import connectDB from "./db/connectDB.js";

connectDB()
  .then(() => {
    console.log("database is connected");
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
