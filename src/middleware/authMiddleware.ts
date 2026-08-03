import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IAuthUser {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
    }
  }
}

export interface AuthRequest extends Request {
  user?: IAuthUser;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token",
      });
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message: "Internal server error: JWT secret not configured",
      });
    }

    const decoded = jwt.verify(token, secretKey) as IAuthUser;
    req.user = decoded;

    next();
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default verifyToken;