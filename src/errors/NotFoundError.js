const { HttpCode } = require("../constants");
const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, HttpCode.NOT_FOUND);
  }
}

module.exports = NotFoundError;
