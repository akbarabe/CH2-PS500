const Joi = require("joi");

const RegisterPayloadSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const LoginPayloadSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  RegisterPayloadSchema,
  LoginPayloadSchema,
};
