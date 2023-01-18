const User = require("../db/models/user");
const customError = require("../utils/customError");

module.exports = {
  followUser: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
      if (userId === id) throw customError("You can not follow yourself", 400);

      const userFollowing = await User.findOne({ _id: userId });
      const userFollowed = await User.findOne({ _id: id });
      if (!userFollowed) throw customError("User not found", 400);

      userFollowing.followings = [...userFollowing.followings, id];
      userFollowed.followers = [...userFollowed.followers, userId];

      await userFollowing.save();
      await userFollowed.save();

      return res.json({
        message: "User followed successfully",
      });
    } catch (err) {
      return next(err);
    }
  },

  unfollowUser: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
      if (userId === id)
        throw customError("You can not unFollow yourself", 400);

      const userUnFollowing = await User.findOne({ _id: userId });
      const userUnFollowed = await User.findOne({ _id: id });
      if (!userUnFollowed) throw customError("User not found", 400);

      userUnFollowing.followings = userUnFollowing.followings.filter(
        (curId) => curId != id
      );
      userUnFollowed.followers = userUnFollowed.followers.filter(
        (curId) => curId != userId
      );

      await userUnFollowing.save();
      await userUnFollowed.save();

      return res.json({
        message: "User UnFollowed successfully",
      });
    } catch (err) {
      return next(err);
    }
  },

  getUser: async (req, res, next) => {
    const userId = req.userId;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) throw customError("User not found", 400);

      const { name, followers, followings } = user;
      return res.json({
        name,
        totalFollowers: followers.length,
        totalFollowings: followings.length,
      });
    } catch (err) {
      return next(err);
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const user = await User.find();
      return res.json({
        user,
      });
    } catch (err) {
      return next(err);
    }
  },
};
