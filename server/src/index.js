import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';
import routes from './routes.js';
import cookieParser from 'cookie-parser'

const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017/', {
        dbName: 'task-manager-project'
    })
    console.log("Successfully connected to database!")
} catch (error) {
    console.log("Failed to connect to database", error.message);
}

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);
app.use(routes);

app.listen(2406, () => {console.log("The server is listening on port http://localhost:2406.....")})