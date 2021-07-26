const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.put("/:id", postController.updatePost);
router.delete("/:id/", postController.deletePost);

//COMMENTAIRES
router.post("/:id/comment", commentController.createComment);
router.get("/:id/comment", commentController.getComments);

module.exports = router;
