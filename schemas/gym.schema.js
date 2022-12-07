const Joi = require("joi");

const name = Joi.string();

const createGymSchema = Joi.object({
  name: name.required()
});

const updateGymSchema = Joi.object({
  name: name
});

module.exports = { createGymSchema, updateGymSchema };
