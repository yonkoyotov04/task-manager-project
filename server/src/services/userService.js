import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { generateAuthToken, generateRefreshToken } from '../utils/tokenUtils.js'

export default {
    async register(userData) {
        const userExists = await User.exists({ email: userData.email });
        const usernameExists = await User.exists({ username: userData.username });

        if (userExists) {
            throw new Error('User already exists!');
        }

        if (usernameExists) {
            throw new Error('Username already exists!');
        }

        if (userData.password !== userData.rePassword) {
            throw new Error('Password mismatch!')
        }

        const user = await User.create(userData);
        const token = generateAuthToken(user);
        const refreshToken = generateRefreshToken(user);

        return {
            user: {
                _id: user.id,
                email: user.email,
                username: user.username,
                theme: user.theme,
                accessToken: token
            },
            refreshToken
        }
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            throw new Error('Email or Password is invaild!');
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            throw new Error('Email or Password is invaild!');
        }

        const token = generateAuthToken(user);
        const refreshToken = generateRefreshToken(user);

        return {
            user: {
                _id: user.id,
                email: user.email,
                username: user.username,
                theme: user.theme,
                accessToken: token
            },
            refreshToken
        }
    },

    getUserData(userId) {
        return User.findById(userId).select({ username: true, email: true });
    },

    editUsername(userId, newUsername) {
        return User.findByIdAndUpdate(userId, {$set: {username: newUsername}}, {runValidators: true, new: true});
    },

    async editPassword(userId, currentPassword, newPassword, repeatPassword) {
        const user = await User.findById(userId);
        const passwordIsValid = await bcrypt.compare(currentPassword, user.password);

        if (!passwordIsValid) {
            throw new Error('Incorrect password!');
        }

        if (newPassword !== repeatPassword) {
            throw new Error('Password mismatch!');
        }

        user.password = newPassword;
        return await user.save();
    },

    changeTheme(userId, newTheme) {
        return User.findByIdAndUpdate(userId, {$set: {theme: newTheme}}, {runValidators: true, new: true});
    }
}