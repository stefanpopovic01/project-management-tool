const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { auth, allowSelf } = require("../middleware/authMiddleware");

router.get("/:id", auth, userController.getUser);
router.patch("/:id", auth, allowSelf, userController.editUser);

module.exports = router;