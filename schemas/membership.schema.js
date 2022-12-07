const Joi = require("joi");

const name = Joi.string();
const price = Joi.number();
const description = Joi.string();
const branchOfficeId = Joi.number().integer();

const createMembershipSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  branchOfficeId: branchOfficeId.required()
});

const updateMembershipSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  branchOfficeId: branchOfficeId,
});

module.exports = { createMembershipSchema, updateMembershipSchema };
