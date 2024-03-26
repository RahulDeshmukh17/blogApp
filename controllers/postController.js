const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savePost = await post.save();

    res.status(200).json({
      success: true,
      data: savePost,
      message: "Post created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "error while creating Post",
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      // .populate("likes")
      .populate("comments")
      .populate("likes")
      .exec();
    res.status(200).json({
      success: true,
      data: posts,
      message: "Post fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "error while fecthing Post",
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Post.findById({ _id: id })
      // .populate("likes")
      .populate("comments")
      .populate("likes")
      .exec();
    if (!posts) {
      return res.status(400).json({
        success: false,
        message: "no post found with given id",
      });
    }
    res.status(200).json({
      success: true,
      data: posts,
      message: "Post fetched successfully by ID",
    });
  } catch (err) {
    res.status(500).json({
      error: "error while fecthing Post by ID",
    });
  }
};
