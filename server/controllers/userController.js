import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register a user
export const registerUser = async (request, response) => {
  const { email, password, confirmPassword } = request.body;

  // check user is already available
  const isUserAvailable = await User.findOne({ email });
  if (isUserAvailable) {
    return response
      .status(400)
      .json({ message: "user is already registered", success: false });
  } else if (password != confirmPassword) {
    return response
      .status(400)
      .json({ message: "confirm password doesn't match", success: false });
  } else if (!email || !password || !confirmPassword) {
    return response
      .status(400)
      .json({ message: "all fields are required", success: false });
  }

  // create Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  return response
    .status(201)
    .json({ message: "user is successfully created", success: true, user });
};

// log in a user
export const loginUser = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  // compare passwords
  // one with request and other hashed one in database

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      // create access token (JWT)
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      response.status(200).json({ success: true, user, accessToken });
    } else {
      return response
        .status(400)
        .json({ message: "password is incorrect", success: false });
    }
  } else {
    return response
      .status(404)
      .json({ message: "user is unavailable", success: false });
  }
};

// get information of a user
export const currentUser = async (request, response) => {
  response.status(200).json({ success: true, user: request.user });
};
