"use strict";

function errorHandler(err, req, res, next) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
}

module.exports = errorHandler;
