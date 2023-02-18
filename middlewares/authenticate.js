const { createError } = require("http-errors"); 
const { User } = require('../models'); 
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env; 


const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        if (bearer !== "Bearer") {
            throw createError(401, "User is not authorized");
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw createError(401, "Not authorized");
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature") {
            error.status = 401;
        }
        next(error);
        //    next(createError(401, "Not authorized"));
    }
   
}; 

module.exports = authenticate; 