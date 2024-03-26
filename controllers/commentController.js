const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const comment = new Comment({ post, user, body });

    //insert in db
    const saveComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: saveComment._id } },
      { new: true } // return updated post
    )
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "comment added successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "error while creating comment",
    });
  }
};
