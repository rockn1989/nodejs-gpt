"use strict";
const { HttpCode } = require("../constants.js");

function errorHandler(err, req, res, next) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error(err);

  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
  });
}

module.exports = errorHandler;
