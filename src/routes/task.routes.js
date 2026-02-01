import { Router } from "express";
import { createNewTask, deleteTask, fetchTasks, updateTaskStatus } from "../controllers/task.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const taskRouter = Router()

taskRouter.route("/add-task").post(requireAuth, createNewTask)

taskRouter.route("/get-all-tasks").get(requireAuth, fetchTasks)

taskRouter.route("/update-task").patch(requireAuth, updateTaskStatus)

taskRouter.route("/delete-task/:id").delete(requireAuth, deleteTask)

export default taskRouter