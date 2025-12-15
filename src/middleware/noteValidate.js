"use strict";
const ValidationError = require("../errors/ValidationError");

const noteValidate = (schema) => async (req, res, next) => {
  const { title, content } = req.body;

  try {
    await schema.validateAsync({ title, content }, { abortEarly: false });
  } catch (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    throw new ValidationError(messages);
  }

  next();
};

module.exports = noteValidate;
