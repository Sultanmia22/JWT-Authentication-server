import { Request, Response } from "express"
import { User } from "../models/user.models";
import bcrypt from "bcrypt"
const createUser = async (req: Request, res: Response) => {
    try {

        const {name,userName,email,password,image} =  req.body;

        if(!name || !userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isExistingUser = await User.findOne({email})

        if(isExistingUser){

            if(!isExistingUser.password){
                return res.status(400).json({
                    success: false,
                    message: "You previously signed up using Google. Please log in by clicking the 'Continue with Google' button."
                })
            }
            return res.status(400).json({
                success: false,
                message: "User already exists with this email.",
            })
        }

        // User Hash Password :
        const hashedPassword = await bcrypt.hash(password,10)
        
        const newUser = {
            name,
            userName,
            email,
            password: hashedPassword,
            image,
            role: 'user',
            provider: ['local']    
        }

        const result = await User.create(newUser)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result
        })

    } catch (err: unknown) {
        console.log(err)
    }
}

export const userController = {
    createUser,
}