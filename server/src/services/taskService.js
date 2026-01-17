import { Task } from '../models/Tasks.js';

export default {
    getAllActiveTasks(userId) {
        return Task.find({ user: userId, status: 'active' });
    },

    getAllCompletedTasks(userId) {
        return Task.find({ user: userId, status: 'completed' });
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
        return Task.findByIdAndUpdate(taskId, { status: 'completed', completedAt: new Date() }, { runValidators: true, new: true });
    },

    deleteAllCompletedTasks(userId) {
        return Task.deleteMany({ user: userId, status: 'completed' });
    },

    returnTask(taskId) {
        return Task.findByIdAndUpdate(taskId, { status: 'active', completedAt: null }, { runValidators: true, new: true });
    }
}