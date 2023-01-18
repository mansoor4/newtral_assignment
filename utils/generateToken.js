const config = require("config");
const jwt = require("jsonwebtoken");

const generateToken = (userId, expiresIn) => {
  const { SERVER_JWT_SECRET_KEY } = config.get("SERVER");
  return jwt.sign({ userId }, SERVER_JWT_SECRET_KEY, { expiresIn });
};

module.exports = generateToken;
