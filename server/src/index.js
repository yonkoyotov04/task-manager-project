import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';
import routes from './routes.js';

const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017/', {
        dbName: 'task-manager-project'
    })
    console.log("Successfully connected to database!")
} catch (error) {
    console.log("Failed to connect to database", error.message);
}

app.use(cors());

app.use(express.json());

app.use(authMiddleware)
app.use(routes);


app.listen(2406, () => {console.log("The server is listening on port http://localhost:2406.....")})