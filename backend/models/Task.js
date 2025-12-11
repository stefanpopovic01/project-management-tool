const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        minLength: [2, "Title should have minimum 2 characters."],
    },
    description: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["planning", "in-progress", "finished"],
        default: "planning",
    }

}, { timestamps: true } );

module.exports = mongoose.model("Task", taskSchema);