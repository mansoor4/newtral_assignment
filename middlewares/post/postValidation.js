const { body } = require("express-validator");

const postValidation = [
  body("title").trim().notEmpty().withMessage("Title should not be empty"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description should not be empty"),
];

module.exports = postValidation;
