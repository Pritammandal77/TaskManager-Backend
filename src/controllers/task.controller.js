import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";


export const createNewTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = req.user?._id

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        if (!title || !description) {
            throw new ApiError(400, "All fields are required")
        }

        const task = await Task.create(
            {
                user,
                title,
                description
            }
        )

        return res
            .status(200)
            .json(
                new ApiResponse(200, task, "Task added successfully")
            )
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode || 500,
                    null,
                    error.message || "Something went wrong"
                )
            );
    }
}

export const fetchTasks = async (req, res) => {
    try {
        const user = req.user?._id

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const tasks = await Task.find({ user })

        return res
            .status(200)
            .json(
                new ApiResponse(200, tasks, "All tasks fetched successfully")
            )
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode || 500,
                    null,
                    error.message || "Something went wrong"
                )
            );
    }

}

export const updateTaskStatus = async (req, res) => {

    try {
        const { taskId, status } = req.body

        if (!taskId) {
            throw new ApiError(404, "could not found the task")
        }

        const allowedStatus = ["pending", "completed"];

        if (!allowedStatus.includes(status)) {
            throw new ApiError(400, "Invalid task status");
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { status } },
            { new: true }
        )

        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "task updated successfully")
            )

    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode || 500,
                    null,
                    error.message || "Something went wrong"
                )
            );
    }
}


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            throw new ApiError(404, "Id is required to delete a task")
        }

        await Task.findByIdAndDelete(id)

        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "Task deleted successfully")
            )
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode || 500,
                    null,
                    error.message || "Something went wrong"
                )
            );
    }
}