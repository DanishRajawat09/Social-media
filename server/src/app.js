import express from "express";
import cors from "cors";
import { CORS_ORIGIN, NODE_ENV } from "./config/envConfig.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true })); // cross origin resource sharing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err.errors && err.errors.length > 0) {
    response.errors = err.errors;
  }

  if (NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
});




export default app;
