const jwt = require("jsonwebtoken");
const config = require("config");
const customError = require("../../utils/customError");

const isAuthenticated = (req, res, next) => {
  const { SERVER_JWT_SECRET_KEY } = config.get("SERVER");
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw customError("You are not authenticated", 401);
    const type = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (!token || type !== "Bearer")
      throw customError("You are not authenticated", 401);
    const result = jwt.verify(token, SERVER_JWT_SECRET_KEY);
    if (!result) throw customError("You are not authenticated", 401);
    const { userId } = result;
    req.userId = userId;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = isAuthenticated;
