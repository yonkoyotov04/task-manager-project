import { Router } from "express";
import userController from "./controllers/userController.js";
import taskController from "./controllers/taskController.js";
import quoteController from "./controllers/quoteController.js";

const routes = Router();

routes.use(userController);
routes.use('/tasks', taskController);
routes.use('/quotes', quoteController)

export default routes;