import mongoose from "mongoose";

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
        unique: true,
        lowercase: true,
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: "enter an velid email",
        },
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
      required: true,
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

export const User = mongoose.model("User", userSchema);
