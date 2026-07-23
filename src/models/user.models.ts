import { model, Schema } from "mongoose";
import { IUser } from "../types/user.interface";

const userSchema = new Schema<IUser> ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

export const User = model<IUser>("User",userSchema)