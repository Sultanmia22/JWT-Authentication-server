import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    provider: {
        type: [String],
        default: ['local']
    },

}, { timestamps: true });

export const User = model('User', userSchema);