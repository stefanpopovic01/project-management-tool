const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const { auth, allowSelf, projectAccess, projectEdit } = require("../middleware/authMiddleware");

router.get("/", auth, projectController.getProjects);
router.get("/user-projects/:id", auth, projectController.fetchUserProjects);
router.post("/", auth, projectController.createProject);
router.get("/single/:id", auth, projectAccess, projectController.getProjectById);
router.patch("/:id", auth, projectEdit, projectController.updateProject);
router.delete("/:id", auth, projectEdit, projectController.deleteProject);
router.post("/invite", auth, projectController.inviteUser);
router.patch("/invite/respond", auth, projectController.respondInvite);
router.get("/invites", auth, projectController.getMyInvites);
router.get("/assigned-projects", auth, projectController.assignedProjects);
router.get("/fetch-assigned-projects/:id", auth, projectController.fetchAssignedProjects);
router.get("/employees/:id", auth, projectEdit, projectController.getProjectEmployees);


module.exports = router;
