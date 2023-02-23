const validation = require('./validation'); 
const ctrlWrapper = require("./ctrl.Wrapper");
const isValidId = require('./isValidId');
const authenticate = require('./authenticate'); 
const upload = require('./upload'); 

module.exports = {
    validation,
    ctrlWrapper,
    isValidId, 
    authenticate,
    upload
}; 