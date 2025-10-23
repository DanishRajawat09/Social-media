import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import {
  emailRegex,
  passwordRegex,
  phoneRegex,
} from "../utils/regexValidator.js";
import { User } from "../models/user.models.js";
import {ApiResponse} from "../utils/apiResponse.js"
export const registerUser = asyncHandler(async (req, res) => {
  const { emailContact, username, password } = req.body;

  if (
    [emailContact, username, password].some((item) => {
      return !item ;
    })
  ) {
    throw new ApiError(406, "all fields are required");
  }

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      406,
      "password must 8 charectors and it have one capital latter one small latter"
    );
  }

  if (!emailRegex.test(emailContact) && !phoneRegex.test(emailContact)) {
    throw new ApiError(406, "please enter valid email or contact");
  }

  const isEmail = emailRegex.test(emailContact);
  const isContact = phoneRegex.test(emailContact);

  const data = {
    username: username.trim(),
    email: isEmail ? { value: emailContact } : undefined,
    contact: isContact ? { value: emailContact } : undefined,
    password: password.trim(),
  };

  const existingUser = await User.findOne({$or:[{"email.value" : emailContact} , {"contact.value" : emailContact} ,{ username : username}]  });
  if (existingUser) {
    throw new ApiError(
      409,
      "accout is already created from this username or email or contact, please login"
    );
  }

  const user = await User.create(data)
  if (!user) {
    throw new ApiError(500 , "your account cannot be ceated , something went wrong ")
  }

  res.status(201).json(new ApiResponse(201 , user , "user is created successFully"))
});
