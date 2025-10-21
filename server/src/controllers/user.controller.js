import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import {
  emailRegex,
  passwordRegex,
  phoneRegex,
} from "../utils/regexValidator.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
export const registerUser = asyncHandler(async (req, res) => {
  const { emailContact, username, password } = req.body;

  if (!emailContact) {
    throw new ApiError(406, "please enter email or contact");
  }
  if (!username) {
    throw new ApiError(406, " username is required");
  }
  if (!password) {
    throw new ApiError(406, "password is required");
  }

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      406,
      "password must be 8 charector and have capital latter and one small latter"
    );
  }

  const data = {
    username,
email : {
    value : ""
},
contact : {
    value : ""
},
password
  };

  if (!emailRegex.test(emailContact) && !phoneRegex.test(emailContact)) {
    throw new ApiError(406, "plz enter valid email or contact");
  }

  if (emailRegex.test(emailContact)) {
    data.email.value = emailContact;
  }

  if (phoneRegex.test(emailContact)) {
    data.contact.value = emailContact;
  }
console.log(data);

  const user = await User.create(data);
  if (!user) {
    throw new ApiError(500, "user create gadbad karra hai");
  }

 

  res
    .status(201)
    .json(new ApiResponse(201, { data: user }, "user created successFully"));
});
