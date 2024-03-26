const express = require("express");
const router = express.Router();

const { createComment } = require("../controllers/commentController");
const {
  createPost,
  getAllPost,
  getPostById,
} = require("../controllers/postController");
const { likePost, unLikePost } = require("../controllers/LikeController");

router.post("/comments/create", createComment);
router.post("/post/create", createPost);
router.get("/posts", getAllPost);
router.get("/posts/:id", getPostById);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unLikePost);

module.exports = router;
