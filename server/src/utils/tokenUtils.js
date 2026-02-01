import jwt from 'jsonwebtoken'
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../config/constants.js';

export function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })

    return token;
}

export function generateRefreshToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    }

    const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: '14d' })

    return refreshToken;
}