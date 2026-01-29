import {JWT_SECRET} from "../config/constants.js";
import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
    
    if (req.path === '/refresh') {
        console.log('In auth if')
        return next();
    }

    const token = req.header("X-Authorization");

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        req.isAuthenticated = true;
        req.isAdmin = decodedToken.email === 'jjotov488@gmail.com' ? true : false;
        next()

    } catch (error) {
        console.log('In auth error');
        res.status(401).end();
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.status(401)
    }

    next()
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.status(403);
    }

    next()
} 