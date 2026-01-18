import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "A task title is required!"],
        minLength: [3, "Task is too short!"]
    },
    deadline: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'completed'],
        default: 'active'
    },
    completedAt: {
        type: String
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

export const Task = model("Task", taskSchema);
