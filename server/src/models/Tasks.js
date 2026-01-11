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
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

export const CompletedTask = model("CompletedTask", taskSchema);
export const ActiveTask = model('ActiveTask', taskSchema);
