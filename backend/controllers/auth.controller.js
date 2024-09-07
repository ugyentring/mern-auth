import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//logic to signup
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Username or email already exists. Please use a different one.",
      });
    }
    next(error);
  }
};

//logic to login
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    //remove password from response
    const { password: hashPassword, ...others } = user._doc;
    // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie(
        "access_token",
        token,
        { httpOnly: true },
        { maxAge: 24 * 60 * 60 * 1000 }
      )
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        user: others,
      });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
