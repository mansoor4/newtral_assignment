const { body } = require("express-validator");

const commentValidation = [
  body("comment").trim().notEmpty().withMessage("Comment should not be empty"),
];

module.exports = commentValidation;
