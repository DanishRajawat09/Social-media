import mongoose from "mongoose";
import {
  JWT_ACCESSTOKEN_EXPIRY,
  JWT_ACCESSTOKEN_SECRET,
  JWT_REFRESHTOKEN_EXPIRY,
  JWT_REFRESHTOKEN_SECRET,
} from "../config/envConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const emailSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Enter a valid email address",
    },
    default: undefined,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const contactSchema = new mongoose.Schema({
  value: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => /^\+?[1-9]\d{1,14}$/.test(value),
      message: "Enter a valid contact number (E.164 format preferred)",
    },
    default: undefined,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: emailSchema,
      required: true,
    },

    contact: {
      type: contactSchema,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
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
    { _id: this._id, email: this.email },
    JWT_ACCESSTOKEN_SECRET,
    { expiresIn: JWT_ACCESSTOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    { _id: this._id, contact: this.contact },
    JWT_REFRESHTOKEN_SECRET,
    {
      expiresIn: JWT_REFRESHTOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
