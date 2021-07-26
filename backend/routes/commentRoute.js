const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentController");

router.delete("/:id", commentCtrl.deleteComment);
module.exports = router;
