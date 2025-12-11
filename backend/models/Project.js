const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Project name is required."],
        minLength: [2, "Project should have minimum 2 characters."],
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    employees: [
        {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        accepted: { type: Boolean, default: false },
        invitedAt: { type: Date, default: Date.now },
        }
    ],
    status: {
        type: String,
        enum: ["planning", "in-progress", "finished"],
        default: "planning",
    }

}, { timestamps: true } );

module.exports = mongoose.model("Project", projectSchema);