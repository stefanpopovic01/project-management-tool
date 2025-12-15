const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const { auth, allowSelf, projectAccess, projectEdit } = require("../middleware/authMiddleware");

router.get("/", auth, projectController.getProjects);
router.post("/", auth, projectController.createProject);
router.get("/single/:id", auth, projectAccess, projectController.getProjectById);
router.patch("/:id", auth, projectEdit, projectController.updateProject);
router.delete("/:id", auth, projectEdit, projectController.deleteProject);
router.post("/invite", auth, projectController.inviteUser);
router.patch("/invite/respond", auth, projectController.respondInvite);


module.exports = router;
