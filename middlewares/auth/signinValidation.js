const { body } = require("express-validator");

const signinValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 6 })
    .withMessage("Password length should contain more than 6 character"),
];

module.exports = signinValidation;
