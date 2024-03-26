const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    const updatedPostLike = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("comments")
      .populate("likes")
      .exec();
    res.status(200).json({
      success: true,
      data: updatedPostLike,
      message: "like added successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "error while creating like",
    });
  }
};

exports.unLikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    const deleteLike = await Like.findOneAndDelete({ post: post, _id: like });
    const updatedPost = await Post.findByIdAndDelete(
      post,
      { $pull: { likes: deleteLike._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "like deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "error while deleting like",
    });
  }
};
