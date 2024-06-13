const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };
