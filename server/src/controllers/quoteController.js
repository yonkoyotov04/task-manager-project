import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import quoteService from "../services/quoteService.js";

const quoteController = Router();

quoteController.get('/', isAuth, async (req, res) => {
    const result = await quoteService.getRandomQuote();
    const randomQuote = result[0].text;

    res.json(randomQuote ?? []);
})

quoteController.post('/', isAuth, async (req, res) => {
    const quoteText = req.body;

    await quoteService.createQuote(quoteText);
})

export default quoteController;