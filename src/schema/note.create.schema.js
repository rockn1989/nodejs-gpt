"use strict";

const Joi = require("joi");
const { NOTE_SCHEMA } = require("../constants");
const { title, content } = require("./note.base.schema");

module.exports = Joi.object({
  title: title.required().messages({
    "any.required": NOTE_SCHEMA.TITLE_EMPTY,
  }),

  content: content.required().messages({
    "any.required": NOTE_SCHEMA.CONTENT_EMPTY,
  }),
});
