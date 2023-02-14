const Joi = require('joi');


const contactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(20)
    .required(),
});



module.exports = contactSchema;