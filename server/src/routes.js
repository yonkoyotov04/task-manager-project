import { Router } from "express";
import userController from "./controllers/userController.js";
import taskController from "./controllers/taskController.js";

const routes = Router();

routes.use(userController);
routes.use('/tasks', taskController);

export default routes;