import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import taskService from "../services/taskService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const taskController = Router();

taskController.get('/active', isAuth, async (req, res) => {
    const userId = req.user?.id;
    const activeTasks = await taskService.getAllActiveTasks(userId);

    res.json(activeTasks ?? []);
})

taskController.get('/completed', isAuth, async (req, res) => {
    const userId = req.user?.id;
    const completedTasks = await taskService.getAllCompletedTasks(userId);

    res.json(completedTasks ?? []);
})

taskController.post('/active', isAuth, async (req, res) => {
    const formData = req.body;
    const userId = req.user?.id;

    try {
        const taskData = { user: userId, ...formData };
        const task = await taskService.createActiveTask(taskData);
        res.json(task ?? []);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.get('/active/:taskId/complete', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        await taskService.completeTask(taskId);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.put('/active/:taskId', isAuth, async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user?.id;
    const newData = req.body;

    try {
        const newTask = { user: userId, newData };
        await taskService.editActiveTask(taskId, newTask);
        res.json({});
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.delete('/active/:taskId', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        await taskService.deleteActiveTask(taskId);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.get('/completed/:taskId/back', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        await taskService.returnToActiveTasks(taskId);
    } catch (error) {
        res.statusMessage = getErrorMessage(error);
        res.status(400).end();
    }
})

taskController.delete('/completed/:taskId', isAuth, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        await taskService.deleteCompletedTask(taskId);
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