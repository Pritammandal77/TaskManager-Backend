import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "completed"]
        }
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskSchema)