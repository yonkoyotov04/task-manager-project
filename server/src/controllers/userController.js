import { Router } from "express";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { generateAuthToken } from "../utils/tokenUtils.js";

const userController = Router();

userController.post('/register', isGuest, async (req, res) => {
    let userData = req.body;
    
    console.log('Body Received', req.body);

    userData['email'] = userData.email.trim();
    userData['username'] = userData.username.trim();
    userData['password'] = userData.password.trim();

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

userController.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.sendStatus(204)
})

userController.post('/refresh', async (req, res) => {
    const token = req.cookies['refreshToken'];

    if (!token) {
        return res.sendStatus(401);
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_JWT_SECRET)
    const newAccessToken = generateAuthToken(decodedToken);
    
    res.status(201).json(newAccessToken);
})

userController.put('/edit/:userId/username', async (req, res) => {
    const usernameData = req.body;
    const userId = req.params.userId;

    const newUsername = usernameData.username.trim();

    const result = await userService.editUsername(userId, newUsername);

    res.status(201).json(result.username);
})

userController.put('/edit/:userId/password', async (req, res) => {
    const newPasswordData = req.body;
    const userId = req.params.userId;

    const currentPassword = newPasswordData.currentPassword.trim();
    const newPassword = newPasswordData.newPassword.trim();
    const repeatPassword = newPasswordData.repeatPassword.trim();

    await userService.editPassword(userId, currentPassword, newPassword, repeatPassword)

    res.status(201).json([]);
})

userController.put('/:userId/theme', async (req, res) => {
    const userId = req.params.userId;
    const formData = req.body;

    const data = await userService.changeTheme(userId, formData.theme);

    res.status(201).json(data.theme);
})

userController.get('/wake', (req, res) => {
    res.status(200).send('Wake up!');
})

export default userController;