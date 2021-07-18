const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.post("/id/comment", commentController.createComment);
router.delete("/:id/", postController.deletePost);

module.exports = router;
