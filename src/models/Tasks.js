import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "A task title is required!"],
        minLength: [3, "Task is too short!"]
    },
    deadline: {
        type: String,
        required: false,
    }
})

const CompletedTask = model("CompletedTask", taskSchema);
const ActiveTask = model('ActiveTask', taskSchema);

export default {
    CompletedTask,
    ActiveTask
};