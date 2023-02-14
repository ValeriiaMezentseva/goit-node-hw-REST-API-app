const Joi = require('joi');

const updateSchema = Joi.object({
  name: Joi.string().min(1).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(20),
});

module.exports = updateSchema; 