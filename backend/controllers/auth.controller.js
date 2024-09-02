import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
