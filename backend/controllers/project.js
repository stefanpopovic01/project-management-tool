const Project = require("../models/Project");
const Task = require("../models/Task");

async function getProjects(req, res) {
  try {

    const projects = await Project.find({ creator: req.user.id });

    return res.status(200).json({
      count: projects.length,
      projects
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function fetchUserProjects(req, res) {
  try {
    const projects = await Project.find({ creator: req.params.id })

    return res.status(200).json({
      count: projects.length,
      projects
    })
  
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
}


async function createProject(req, res) {
  try {
    const { name, description, deadline } = req.body;

    const project = new Project({
      name,
      description,
      deadline,
      creator: req.user.id,
      employees: [],
      status: "planning"
    });

    await project.save();

    return res.status(201).json({
      message: "Project created.",
      project,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id)
            .populate("creator", "name email")
            .populate("employees", "name email");

        if (!project) return res.status(404).json({ message: "Project not found." });

        res.status(200).json(project);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateProject(req, res) {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!project)
            return res.status(404).json({ message: "Project not found." });

        res.status(200).json({ message: "Project updated.", project });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);

        if (!project)
            return res.status(404).json({ message: "Project not found." });

        await Task.deleteMany({ project: project._id });

        await project.deleteOne();

        res.status(200).json({ message: "Project deleted." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function inviteUser(req, res) {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (req.user.id !== project.creator.toString())
      return res.status(403).json({ message: "Not authorized" });

    const alreadyInvited = project.employees.find(
      (e) => e.user.toString() === userId
    );
    if (alreadyInvited)
      return res.status(400).json({ message: "User already invited" });

    project.employees.push({
      user: userId,
      accepted: false,
      invitedAt: Date.now(),
    });

    await project.save();

    res.status(200).json({ message: "User invited", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function respondInvite(req, res) {
  try {
    const { projectId, accept } = req.body;
    const userId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const employee = project.employees.find(
      (e) => e.user.toString() === userId
    );
    if (!employee) return res.status(403).json({ message: "Not invited" });

    employee.accepted = accept;
    await project.save();

    res.status(200).json({ message: "Response recorded", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function getMyInvites(req, res) {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      employees: {
        $elemMatch: {
          user: userId,
          accepted: false
        }
      }
    })
    .populate("creator", "name email");

    res.status(200).json({
      count: projects.length,
      projects
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function assignedProjects(req, res) {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      employees: {
        $elemMatch: {
          user: userId,
          accepted: true
        }
      }
    })
      .populate("creator", "name email");

    return res.status(200).json({
      count: projects.length,
      projects
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


async function fetchAssignedProjects(req, res) {
  try {
    const projects = await Project.find({
      employees: {
        $elemMatch: {
          user: req.params.id,
          accepted: true
        }
      }
    })
      .populate("creator", "name email");

    return res.status(200).json({
      count: projects.length,
      projects
    });

  } catch {
    return res.status(500).json({ error: err.message });
  }
}

async function getProjectEmployees(req, res) {
  try {

    const project = await Project.findById(req.params.id)
      .populate("employees.user", "name email");

    if (!project)
      return res.status(404).json({ message: "Project not found." });

    const employees = project.employees
      .filter(emp => emp.accepted === true)
      .map(emp => emp.user);

    return res.status(200).json({
      count: employees.length,
      employees
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



module.exports = { getProjects, createProject, getProjectById, updateProject, deleteProject, inviteUser, respondInvite, getMyInvites, assignedProjects, getProjectEmployees, fetchUserProjects, fetchAssignedProjects };
