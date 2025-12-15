"use strict";

const Joi = require("joi");
const { title, content } = require("./note.base.schema");

module.exports = Joi.object({
  title,
  content,
}).min(1);
