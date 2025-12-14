"use strict";

const Joi = require("joi");
const { NOTE_SCHEMA } = require("../constants");

module.exports = Joi.object({
  title: Joi.string()
    .pattern(/[$&+,:;=?@#|'<>.^*()%!]+$/)
    .required()
    .messages({
      "string.patter.base": NOTE_SCHEMA.TITLE,
    }),

  content: Joi.string()
    .pattern(/[$&+,:;=?@#|'<>.^*()%!]+$/)
    .required()
    .messages({
      "string.patter.base": NOTE_SCHEMA.CONTENT,
      "string.max": NOTE_SCHEMA.CONTENT_LENGTH,
    }),
});
