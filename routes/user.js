const { Router } = require("express");
const app = require("../app");

/* Import Middlewares */
const isAuthenticated = require("../middlewares/index/isAuthenticated");

/* Import Controllers */
const {
  followUser,
  unfollowUser,
  getUser,
  getAllUser,
} = require("../db/controllers/user");

const route = Router();

route.post("/follow/:id", isAuthenticated, followUser);

route.post("/unfollow/:id", isAuthenticated, unfollowUser);

route.get("/user", isAuthenticated, getUser);

route.get("/all_user", isAuthenticated, getAllUser);

module.exports = route;
