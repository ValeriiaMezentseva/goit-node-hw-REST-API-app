const { Contact } = require("./contact"); 
const { addSchema } = require("./contact"); 
const { updateSchema } = require("./contact"); 
const { updateFavoriteSchema } = require("./contact"); 
const { User } = require("./user"); 
const { authSchema } = require("./user");
const { updateSubscriptionSchema } = require("./user"); 
const { emailSchema } = require('./user'); 

module.exports = {
    Contact, 
    User,
    addSchema, 
    updateSchema, 
    updateFavoriteSchema,
    authSchema, 
    updateSubscriptionSchema, 
    emailSchema,
}; 