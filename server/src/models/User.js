import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "An email is required!"],
        minLength: [6, "Email is too short!"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid Email!"]
    },
    username: {
        type: String,
        required: [true, "A username is required!"],
        minLength: [2, "Username is too short!"],
        maxLength: [30, "Username is too long!"]
    },
    password: {
        type: String,
        required: [true, "A password is required!"],
        minLength: [6, "Your password is too short!"],
        match: [/^[a-zA-Z0-9]+$/, "Your password can only include letters and numbers!"]
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
})

const User = model("User", userSchema);

export default User; 