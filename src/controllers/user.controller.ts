import { Request, Response } from "express";
import { User } from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create User Controller
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      if (!isExistingUser.password) {
        return res.status(400).json({
          success: false,
          message:
            "You previously signed up using Google. Please log in by clicking the 'Continue with Google' button.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // User Hash Password :
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      provider: ["local"],
    };

    const result = await User.create(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (er: unknown) {
    console.error("Login Error:", er);
    return res.status(500).json({
      success: false,
      message: er instanceof Error ? er.message : "Internal Server Error",
    });
  }
};

// Login User Controller
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    const userObj = user?.toObject();
    delete userObj?.password;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        email: user?.email,
        id: user?._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: userObj,
      },
    });
  } catch (er: unknown) {
    console.log(er);
    return res.status(500).json({
      success: false,
      message: er instanceof Error ? er.message : "Internal Server Error",
    });
  }
};

export const userController = {
  createUser,
  loginUser,
};
