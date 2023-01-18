const User = require("../db/models/user");
const crypto = require("crypto");
const customError = require("../utils/customError");
const generateToken = require("../utils/generateToken");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) throw customError("User already register, please signin", 400);

      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      const newUserBody = {
        name: name,
        email: email,
        password: hash,
        salt: salt,
      };

      const newUser = await User.create(newUserBody);
      if (!newUser) throw customError("User not created", 400);

      return res.json({
        message: "register successfully",
        userId: newUser._id,
      });
    } catch (err) {
      return next(err);
    }
  },

  authenticate: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) throw customError("User not register, please register", 400);

      const { salt, password: storedPassword, _id: userId } = user;
      const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
      if (hash !== storedPassword)
        throw customError("Password is incorrect", 400);

      const token = generateToken(userId, 1000 * 60 * 60 * 24);

      return res.json({
        message: "signin successfully",
        token,
      });
    } catch (err) {
      return next(err);
    }
  },
};
