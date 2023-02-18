const { Schema, model } = require('mongoose'); 
const Joi = require('joi');
const { errorHandler } = require("../middlewares"); 

const contactSchema = Schema({
  name: {
    type: String, 
    required: [true, 'Set name for contact']
  },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
       required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
  },
     owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
},
  { versionKey: false, timestamps: true });

const addSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(20).required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(1).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(20),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
}); 

contactSchema.post("save", errorHandler); 

const Contact = model("contact", contactSchema); 

module.exports = {
  Contact, 
  addSchema,
  updateSchema, 
  updateFavoriteSchema
};