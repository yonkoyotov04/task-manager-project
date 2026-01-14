import { Router } from "express";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import userSercive from "../services/userSercive.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const userController = Router();

userController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userSercive.register(userData);
        res.status(201).json(token)
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

userController.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await userSercive.login(email, password);
        res.status(201).json(token);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(401).end();
    }
})

userController.get('/:userId', isAuth, async (req, res) => {
    const userId = req.params.userId;
    const profileData = await userSercive.getUserData(userId);

    res.status(201).json(profileData);
})

export default userController;