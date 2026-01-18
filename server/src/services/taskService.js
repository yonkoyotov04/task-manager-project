import { Task } from '../models/Tasks.js';

export default {
    getAllTasks(userId) {
        return Task.find({ user: userId });
    },

    createTask(taskData) {
        return Task.create(taskData);
    },

    editTask(taskId, newData) {
        return Task.findByIdAndUpdate(taskId, newData, { runValidators: true })
    },

    deleteTask(taskId) {
        return Task.findByIdAndDelete(taskId);
    },

    completeTask(taskId) {
        const date = new Date();
        const shortDate = date.toLocaleString("en-GB", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
        return Task.findByIdAndUpdate(taskId, { status: 'completed', completedAt: shortDate }, { runValidators: true, new: true });
    },

    deleteAllCompletedTasks(userId) {
        return Task.deleteMany({ user: userId, status: 'completed' });
    },

    returnTask(taskId) {
        return Task.findByIdAndUpdate(taskId, { status: 'active', completedAt: null }, { runValidators: true, new: true });
    }
}