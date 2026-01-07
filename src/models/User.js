import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "An email is required!"],
        minLength: [6, "Email is too short!"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid Email!"]
    },
    username: {
        type: String,
        required: [true, "A username is required!"]
    }
})