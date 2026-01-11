import { Schema, model } from "mongoose";

const quoteSchema = new Schema({
    text: {
        type: String,
        required: [true, "Quote text is required!"],
        minLength: [3, "Quote is too short!"]
    }
})

const Quote = model("Quote", quoteSchema);

export default Quote;