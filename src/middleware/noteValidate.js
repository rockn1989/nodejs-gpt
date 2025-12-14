"use strict";

const noteValidate = (schema) => async (req, res, next) => {
  const { title, content } = req.body;
  console.log(title, content);
  try {
    await schema.validateAsync({ title, content }, { abortEarly: false });
    console.log(123);
  } catch (error) {
    const { details } = error;
    const errorsList = details.map((err) => err.message);

    return res.status(403).send({ errorsList });
  }

  return next();
};

module.exports = noteValidate;
