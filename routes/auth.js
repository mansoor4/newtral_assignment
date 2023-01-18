const { Router } = require("express");
const app = require("../app");

/* Import Middlewares */
const signinValidation = require("../middlewares/auth/signinValidation");
const signupValidation = require("../middlewares/auth/signupValidation");
const validationError = require("../middlewares/index/validationError");

/* Import Controllers */
const { authenticate, register } = require("../controllers/auth");

const route = Router();

route.post("/authenticate", signinValidation, validationError, authenticate);

route.post("/register", signupValidation, validationError, register);

module.exports = route;
