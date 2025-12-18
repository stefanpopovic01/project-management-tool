const Task = require("../models/Task")
const Project = require("../models/Project");

async function updateProjectStatus(projectId) {
  const tasks = await Task.find({ project: projectId });

  if (tasks.length === 0) {
    await Project.findByIdAndUpdate(projectId, {
      status: "planning",
    });
    return;
  }

  const hasInProgress = tasks.some(t => t.status === "in-progress");
  const allFinished = tasks.every(t => t.status === "finished");

  let newStatus = "planning";

  if (hasInProgress) {
    newStatus = "in-progress";
  }

  if (allFinished) {
    newStatus = "finished";
  }

  await Project.findByIdAndUpdate(projectId, {
    status: newStatus,
  });
}

module.exports = updateProjectStatus;
