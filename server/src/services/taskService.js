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

    async completeTask(taskId) {
        const task = await Task.findById(taskId).select({'status': true});
        let taskStatus = 'completed';

        if (task.status === 'expired') {
            taskStatus = 'completed-expired'
        }

        const date = new Date();
        const shortDate = date.toLocaleString("en-GB", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
        
        return Task.findByIdAndUpdate(taskId, { status: taskStatus, completedAt: shortDate }, { runValidators: true, new: true });
    },

    expireTask(taskId) {
        return Task.findByIdAndUpdate(taskId, {status: 'expired'}, {runValidators: true, new: true});
    },

    deleteAllCompletedTasks(userId) {
        return Task.deleteMany({ user: userId, status: { $in: ['completed', 'completed-expired'] } });
    },

    returnTask(taskId) {
        return Task.findByIdAndUpdate(taskId, { status: 'active', completedAt: null }, { runValidators: true, new: true });
    }
}