const { validationResult } = require("express-validator");
const customError = require("../../utils/customError");

const validationError = async (req, res, next) => {
  try {
    const error = validationResult(req).array();
    if (error.length > 0) {
      throw customError(error[0].msg, 400);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validationError;
