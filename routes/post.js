const { Router } = require("express");
const app = require("../app");

/* Import Middlewares */
const isAuthenticated = require("../middlewares/index/isAuthenticated");
const postValidation = require("../middlewares/post/postValidation");
const commentValidation = require("../middlewares/post/commentValidation");
const validationError = require("../middlewares/index/validationError");

/* Import Controllers */
const {
  createPost,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  getPost,
  getAllPosts,
} = require("../db/controllers/post");

const route = Router();

route.post(
  "/posts",
  isAuthenticated,
  postValidation,
  validationError,
  createPost
);

route.delete("/posts/:id", isAuthenticated, deletePost);

route.post("/like/:id", isAuthenticated, likePost);

route.post("/unlike/:id", isAuthenticated, unlikePost);

route.post(
  "/comment/:id",
  isAuthenticated,
  commentValidation,
  validationError,
  createComment
);

route.get("/posts/:id", isAuthenticated, getPost);

route.get("/all_posts", isAuthenticated, getAllPosts);

module.exports = route;
