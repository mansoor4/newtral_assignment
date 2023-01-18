const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    unlikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
