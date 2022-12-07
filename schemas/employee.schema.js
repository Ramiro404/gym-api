const Joi = require("joi");

const name = Joi.string();
const lastname = Joi.string();
const hireDate = Joi.date();

const createEmployeeSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  hireDate: hireDate.required()
});

const updateEmployeeSchema = Joi.object({
  name: name,
  lastname: lastname,
  hireDate: hireDate
});

module.exports = { createEmployeeSchema, updateEmployeeSchema };
