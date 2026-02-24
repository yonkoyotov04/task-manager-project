import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';
import routes from './routes.js';
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const uri = process.env.SERVER_URI;
const PORT = process.env.PORT || 2406;

const app = express();
// 'mongodb://localhost:27017/'

try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'task-manager-project'
    })
    console.log("Successfully connected to database!")
} catch (error) {
    console.log("Failed to connect to database", error.message);
}

app.use(cors({
    origin: [
        'https://task-manager-project-phi.vercel.app',
        'http://localhost:2406'
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);
app.use(routes);

app.listen(PORT, '0.0.0.0', () => {console.log(`The server is listening on port ${PORT}.....`)})