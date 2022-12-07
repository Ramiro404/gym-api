const Joi = require("joi");

const name = Joi.string();
const gymId = Joi.number().integer();

const createBranchOfficeSchema = Joi.object({
  name: name.required(),
  gymId: gymId.required()
});

const updateBranchOfficeSchema = Joi.object({
  name: name,
  gymId: gymId
});

module.exports = { createBranchOfficeSchema, updateBranchOfficeSchema };
