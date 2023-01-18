const Comment = require("../models/comment");
const Post = require("../models/post");
const customError = require("../../utils/customError");

module.exports = {
  createPost: async (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.userId;
    const postBody = {
      title,
      description,
      userId,
    };

    try {
      const newPost = await Post.create(postBody);
      if (!newPost) throw customError("Post not created", 400);
      const { _id, title, description, createdAt } = newPost;

      return res.json({
        title,
        description,
        postId: _id,
        createdTime: createdAt,
      });
    } catch (err) {
      return next(err);
    }
  },

  deletePost: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const post = await Post.deleteOne({ _id: id, userId });
      if (!post) throw customError("Post not found", 400);

      return res.json({
        message: "Post deleted successfully",
      });
    } catch (err) {
      return next(err);
    }
  },

  likePost: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const post = await Post.findOne({ _id: id });
      if (!post) throw customError("Post not found", 400);
      post.likes = post.likes.filter((curId) => curId != userId);
      post.unlikes = post.unlikes.filter((curId) => curId != userId);
      post.likes = [...post.likes, userId];

      await post.save();

      return res.json({
        message: "Post like successfully",
      });
    } catch (err) {
      return next(err);
    }
  },

  unlikePost: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const post = await Post.findOne({ _id: id });
      if (!post) throw customError("Post not found", 400);
      post.likes = post.likes.filter((curId) => curId != userId);
      post.unlikes = post.unlikes.filter((curId) => curId != userId);
      post.unlikes = [...post.unlikes, userId];

      await post.save();

      return res.json({
        message: "Post unlike successfully",
      });
    } catch (err) {
      return next(err);
    }
  },

  createComment: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    try {
      const post = await Post.findOne({ _id: id });
      if (!post) throw customError("Post not found", 400);

      const commentBody = {
        text: comment,
        postId: id,
        userId,
      };

      const newComment = await Comment.create(commentBody);
      if (!newComment) throw customError("Comment not created", 400);

      const { _id: commentId } = newComment;

      return res.json({
        message: "Commented Sucessfully",
        commentId,
      });
    } catch (err) {
      return next(err);
    }
  },

  getPost: async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Post.findOne({ _id: id });
      if (!post) throw customError("Post not found", 400);

      const comments = await Comment.find({ postId: id }).select("text -_id");

      const { title, description, createdAt, likes } = post;

      return res.json({
        id,
        title,
        description,
        created_at: createdAt,
        comments,
        likes: likes.length,
      });
    } catch (err) {
      return next(err);
    }
  },

  getAllPosts: async (req, res, next) => {
    const userId = req.userId;
    let posts = [];
    try {
      const allPosts = await Post.find({ userId }).sort({ createdAt: -1 });

      for (let post of allPosts) {
        const { _id, title, description, createdAt, likes } = post;

        const comments = await Comment.find({ postId: _id }).select(
          "text -_id"
        );

        posts = [
          ...posts,
          {
            id: _id,
            title,
            description,
            created_at: createdAt,
            comments,
            likes: likes.length,
          },
        ];
      }

      return res.json({
        posts,
      });
    } catch (err) {
      return next(err);
    }
  },
};
