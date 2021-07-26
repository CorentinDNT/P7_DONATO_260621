//IMPORTS
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//ROUTES
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.post("/:id", userController.updateUserImage);
router.delete("/:id", userController.deleteUser);

module.exports = router;
