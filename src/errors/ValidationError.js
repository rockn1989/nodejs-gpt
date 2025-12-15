const { HttpCode } = require("../constants");
const AppError = require("./AppError");

class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, HttpCode.BAD_REQUEST);
  }
}

module.exports = ValidationError;
