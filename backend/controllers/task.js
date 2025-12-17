const Task = require("../models/Task");
const Project = require("../models/Project");

async function getTasks(req, res) {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const tasks = await Task.find({
      assignedTo: userId,
      project: projectId
    });

    return res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


async function getTaskById(req, res) {
    try {

        const task = await Task.findById(req.params.id)
            .populate("assignedTo", "name email")
            .populate("project", "name");

        if (!task)
            return res.status(404).json({ message: "Task not found." });

        if (task.assignedTo._id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to view this task." });
        }

        res.status(200).json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function createTask(req, res) {
  try {
    const { title, description = "", project, assignedTo } = req.body;

    const projectData = await Project.findById(project);
    if (!projectData)
      return res.status(404).json({ message: "Project not found." });

    if (req.user.id !== projectData.creator.toString())
      return res.status(403).json({ message: "Not authorized to create tasks." });

    const employee = projectData.employees.find(
      (emp) => emp.user.toString() === assignedTo
    );

    if (!employee)
      return res.status(400).json({ message: "User is not part of the project." });

    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      status: "planning" 
    });

    await task.save();

    res.status(201).json({
      message: "Task created.",
      task
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function updateTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found." });

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this task." });
    }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json({
      message: "Task updated.",
      task
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id).populate("project", "creator");

    if (!task)
      return res.status(404).json({ message: "Task not found." });

    if (task.project.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this task." });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };



