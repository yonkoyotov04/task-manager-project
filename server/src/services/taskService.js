import { ActiveTask } from '../models/Tasks.js';
import { CompletedTask } from '../models/Tasks.js';

export default {
    getAllActiveTasks() {
        return ActiveTask.find();
    },

    getAllCompletedTasks() {
        return CompletedTask.find()
    },

    createActiveTask(taskData) {
        return ActiveTask.create(taskData);
    },

    editActiveTask(taskId, newData) {
        return ActiveTask.findByIdAndUpdate(taskId, newData, {runValidators: true})
    },

    deleteActiveTask(taskId) {
        return ActiveTask.findByIdAndDelete(taskId);
    },

    async completeTask(taskId) {
        const taskData = await ActiveTask.findById(taskId);
        await CompletedTask.create(taskData);
        await ActiveTask.findByIdAndDelete(taskId);
    },

    deleteCompletedTask(taskId) {
        return CompletedTask.findByIdAndDelete(taskId);
    },

    deleteAllCompletedTasks(userId) {
        return CompletedTask.deleteMany({user: userId});
    },

    async returnToActiveTasks(taskId) {
        const taskData = await CompletedTask.findById(taskId);
        await ActiveTask.create(taskData);
        await CompletedTask.findByIdAndDelete(taskId);
    }
}