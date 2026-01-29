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
        const {user, refreshToken} = await userService.register(userData);
        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: false, sameSite: 'none'});
        res.status(201).json(user)
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

userController.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;

    try {
        const {user, refreshToken} = await userService.login(email, password);
        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: false, sameSite: 'none'});
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
    const token = req.cookies.refreshToken;
    console.log(`The token is: ${token}`);
    const user = req.user;

    if(!token) {
        return res.sendStatus(401);
    } 

    jwt.verify(token, REFRESH_JWT_SECRET, (err) => {
        if (err) {
            return res.sendStatus(403);
        }

        const newAccessToken = generateAuthToken(user);
        console.log(newAccessToken);
        const newData = {
            _id: user.id,
            email: user.email,
            username: user.username,
            accessToken: newAccessToken
        }
        res.status(201).json(newData);
    })
})

export default userController;