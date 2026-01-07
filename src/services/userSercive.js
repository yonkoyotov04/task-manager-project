import User from '../models/User.js'
import bcrypt from 'bcrypt'
import {generateAuthToken} from '../utils/tokenUtils.js'

export default {
    async register(userData) {
        const userExists = await User.exists({email: userData.email});
        const usernameExists = await User.exists({username: userData.username});

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

        return {
            _id: user.id,
            email: user.email,
            username: user.username,
            accessToken: token
        }
    }
}