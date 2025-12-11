const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const { auth } = require("../middleware/authMiddleware");

router.get("/:id", auth, taskController.getTasks);
router.get("/single/:id", auth, taskController.getTaskById);
router.post("/", auth, taskController.createTask);
router.patch("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;