const express = require("express");
const cors = require("cors");
const dns = require("dns");
const customError = require("./utils/customError");

/* Express App */
const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());

/* Routes Import */
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const authRouter = require("./routes/auth");

/* Check internet connectivity */
app.use(async (req, res, next) => {
  try {
    await dns.promises.lookup("google.com");
    return next();
  } catch (err) {
    return next(err);
  }
});

/* Server Health Status */
app.use("/health", (req, res, next) => {
  return res.json({
    message: "Api is running",
    status: 200,
  });
});

/*Routes*/
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", authRouter);
app.use("/", (req, res, next) => next(customError("Invalid route", 400)));

/* Error Handler */
app.use((err, req, res, next) =>
  res.status(err.status || 500).json({
    message: err.message,
  })
);

module.exports = app;
