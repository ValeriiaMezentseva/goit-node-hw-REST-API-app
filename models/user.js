const { Schema, model } = require("mongoose"); 
const Joi = require('joi');
const errorHandler = require("../helpers/errorValidation"); 

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String, 
        required: true, 

    }, 
    verify: {
        type: Boolean, 
        default: false,
    }, 
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
},
    { versionKey: false, timestamps: true }
); 


userSchema.post("save", errorHandler); 


const authSchema = Joi.object({
    password: Joi.string().min(4).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    subscription: Joi.string(),
    token: Joi.string(),
}); 

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
}); 

const emailSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})



const User = model("user", userSchema); 

module.exports = {
    User,
    authSchema,
    updateSubscriptionSchema, 
    emailSchema,
}