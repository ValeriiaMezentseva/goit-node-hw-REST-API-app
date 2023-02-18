const { Schema, model } = require("mongoose"); 
const Joi = require('joi');
const { errorHandler } = require("../middlewares"); 

const userSchema = Schema({
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
        default: ""
    },
},
    { versionKey: false, timestamps: true });


userSchema.post("save", errorHandler); 


const authSchema = Joi.object({
    password: Joi.string().min(4).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    subscription: Joi.string(),
    token: Joi.string(),
}); 



const User = model("user", userSchema); 

module.exports = {
    User,
    authSchema
}