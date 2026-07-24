import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IAuthUser {
    email: string,
    id: string,
}

interface AuthRequest extends Request {
    user: IAuthUser
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try{

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Missing or invalid authorization header",
            })
        }

        const token = authHeader.split(" ")[1];

          if (!token) {
             return res.status(401).json({ 
                success: false,
                message: "Unauthorized: No token" 
            });
          }
   
          const secretKey = process.env.JWT_SECRET;

          if(!secretKey) {
            return res.status(500).json({
                success: false,
                message: "Internal server error: JWT secret not configured",
            })
          }

          const decode = jwt.verify(token, secretKey);

          req.user = decode as IAuthUser;

          next();

    } catch(er:unknown) {
        console.log(er);
        if(er instanceof Error) {
            return res.status(401).json({
                success: false,
                message: er.message,
            })
        };

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export default verifyToken;