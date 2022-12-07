const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string().min(8);
const branchOfficeId = Joi.number().integer();
const employeeId = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  branchOfficeId: branchOfficeId.required(),
  employeeId: employeeId
});

const updateUserSchema = Joi.object({
  email: email,
  branchOfficeId: branchOfficeId,
  employeeId: employeeId
});

module.exports = { createUserSchema, updateUserSchema };
