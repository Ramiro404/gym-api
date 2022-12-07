const Joi = require("joi");
const id = Joi.number().integer();

const getIdSchema = Joi.object({
  id: id.required()
});

module.exports = { getIdSchema };
