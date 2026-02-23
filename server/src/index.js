import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';
import routes from './routes.js';
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const database_uri = process.env.MONGODB_URI;
const uri = process.env.SERVER_URI;

const app = express();
// 'mongodb://localhost:27017/'

try {
    await mongoose.connect(database_uri, {
        dbName: 'task-manager-project'
    })
    console.log("Successfully connected to database!")
} catch (error) {
    console.log("Failed to connect to database", error.message);
}

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);
app.use(routes);

app.listen(2406, () => {console.log(`The server is listening on port ${uri}.....`)})