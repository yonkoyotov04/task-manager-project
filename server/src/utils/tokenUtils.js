import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })

    return token;
}

export function generateRefreshToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    }

    const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET, { expiresIn: '14d' })

    return refreshToken;
}