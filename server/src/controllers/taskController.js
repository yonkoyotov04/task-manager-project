import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import taskService from "../services/taskService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const taskController = Router();

taskController.get('/', isAuth, async (req, res) => {
    const userId = req.user?.id;
    const activeTasks = await taskService.getAllTasks(userId);

    res.json(activeTasks ?? []);
})

taskController.post('/active', isAuth, async (req, res) => {
    const formData = req.body;
    const userId = req.user?.id;

    try {
        const taskData = { user: userId, ...formData };
        console.log(taskData);
        const task = await taskService.createTask(taskData);
        res.json(task ?? []);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.put('/:taskId/complete', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const updatedTask = await taskService.completeTask(taskId);
        res.json(updatedTask ?? []);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.put('/:taskId', isAuth, async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user?.id;
    const newData = req.body;

    try {
        const newTask = { user: userId, newData };
        await taskService.editTask(taskId, newTask);
        res.json({});
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.delete('/:taskId', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        await taskService.deleteTask(taskId);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.put('/:taskId/back', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const updatedTask = await taskService.returnTask(taskId);
        res.json(updatedTask ?? []);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.delete('/:taskId', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        await taskService.deleteTask(taskId);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.delete('/completed', isAuth, async (req, res) => {
    const userId = req.user?.id;

    try {
        await taskService.deleteAllCompletedTasks(userId);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

export default taskController