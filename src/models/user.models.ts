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
    username: {
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

export const user = model<IUser>("User",userSchema)