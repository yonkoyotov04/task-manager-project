import { Router } from "express";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import jwt from 'jsonwebtoken';
import { REFRESH_JWT_SECRET } from "../config/constants.js";
import { generateAuthToken } from "../utils/tokenUtils.js";

const userController = Router();

userController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const { user, refreshToken } = await userService.register(userData);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'none', 
            path: '/',
            maxAge: 14 * 24 * 60 * 60 * 1000
        });
        res.status(201).json(user)
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

userController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, refreshToken } = await userService.login(email, password);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 14 * 24 * 60 * 60 * 1000
        });
        res.status(201).json(user);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(401).end();
    }
})

userController.get('/', isAuth, async (req, res) => {
    const userId = req.user?.id;
    const profileData = await userService.getUserData(userId);

    res.status(201).json(profileData);
})

userController.post('/logout', isAuth, (req, res) => {
    res.clearCookie('refreshToken');
    res.sendStatus(204)
})

userController.post('/refresh', async (req, res) => {
    const token = req.cookies['refreshToken'];

    if (!token) {
        return res.sendStatus(401);
    }

    const decodedToken = jwt.verify(token, REFRESH_JWT_SECRET)

    const newAccessToken = generateAuthToken(decodedToken);
    const newData = {
        _id: decodedToken.id,
        email: decodedToken.email,
        username: decodedToken.username,
        accessToken: newAccessToken
    }
    res.status(201).json(newData);
})

export default userController;