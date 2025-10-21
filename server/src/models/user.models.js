import mongoose from "mongoose";
import { JWT_ACCESSTOKEN_EXPIRY, JWT_ACCESSTOKEN_SECRET, JWT_REFRESHTOKEN_EXPIRY, JWT_REFRESHTOKEN_SECRET } from "../config/envConfig.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "username is Required"],
      unique: true,
      trim: true,
    },
    email: {
      value: {
        type: String,
        trim: true,
        // unique: true,
        lowercase: true,
        // validate: {
        //   validator: function (value) {
        //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        //   },
        //   message: "enter an velid email", 
        // },
      },
      isVarified: {
        type: Boolean,
        default: false,
      },
    },
    contact: {
      value: {
        type: String,
        trim: true,
        unique: true,
        validate: {
          validator: function (value) {
            return /^\+?[1-9]\d{1,14}$/.test(value);
          },
          message: "enter an valid number",
        },
      },
      isVarified: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
    
      trim: true,
      validate: {
        validator: function (value) {
          return typeof value === "string" && value.length >= 6;
        },
        message: "Password is required and must be at least 6 characters",
      },
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email},
    JWT_ACCESSTOKEN_SECRET,
    { expiresIn: JWT_ACCESSTOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ _id: this._id, contact: this.contact }, JWT_REFRESHTOKEN_SECRET, {
    expiresIn: JWT_REFRESHTOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
