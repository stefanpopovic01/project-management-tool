const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/:id", userController.getUser);
router.patch("/:id", userController.editUser);

module.exports = router;