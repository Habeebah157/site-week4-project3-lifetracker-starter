"use strict";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");

const { NotFoundError } = require("./utils/errors");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));

app.use("/auth", authRoutes);
// error handler

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});
app.use(function (req, res, next) {
  return next(new NotFoundError());
});
// const port = 3000;

app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;

// app.listen(port, () => {
//   console.log(`❤️ Server running https://localhost:${port}`);
// });
