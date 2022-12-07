const Joi = require("joi");

const name = Joi.string();
const lastname = Joi.string();
const birthdate = Joi.date();
const branchOfficeId = Joi.number().integer();

const clientId = Joi.number().integer();
const membershipId = Joi.number().integer();
const paymentDate = Joi.date();

const createClientSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  birthdate: birthdate.required(),
  branchOfficeId: branchOfficeId.required(),
  membershipId: membershipId.required(),
  paymentDate: paymentDate.required()
});

const updateClientSchema = Joi.object({
  name: name,
  lastname: lastname,
  birthdate: birthdate,
  branchOfficeId: branchOfficeId
});

const addPayment = Joi.object({
  paymentDate: paymentDate.required(),
  clientId: clientId.required(),
  membershipId: membershipId.required()
});

module.exports = { createClientSchema, updateClientSchema, addPayment };
