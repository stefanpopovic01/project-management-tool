const jwt = require("jsonwebtoken");
const Project = require("../models/Project");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'You are not logged.' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id, role}
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired.' });
  }
}

function allowSelf(req, res, next) {
    const loggedUserId = req.user.id;
    const paramId = req.params.id;

    if (loggedUserId !== paramId) {
        return res.status(403).json({ message: 'You are not allowed to edit this profile.' });
        console.log(loggedUserId);
        console.log(paramId);
    }
    next();
}

async function projectAccess(req, res, next) {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const isCreator = project.creator.toString() === userId;
    const isAcceptedEmployee = project.employees.some(
      (e) => e.user?.toString() === userId && e.accepted
    );

    if (!isCreator && !isAcceptedEmployee) {
      return res.status(403).json({ message: "Not authorized." });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function projectEdit(req, res, next) {
  try {
      const projectId = req.params.id;
      const userId = req.user.id;

      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }
      const isCreator = project.creator.toString() === userId;
      if (!isCreator) {
        return res.status(403).json({ message: "Not autorized." });
      }
      next();

  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { auth, allowSelf, projectAccess, projectEdit };