const { Unauthorized } = require("http-errors");
const { User } = require('../models'); 
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env; 


const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
          if (!token || bearer !== "Bearer") {
          throw new Unauthorized("User is not authorized");
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || token !== String(user.token)) {
            throw new Unauthorized("User is not authorized");
        }
        req.user = user;
        next();
    } catch (error) {
          if(error.message === "invalid signature"){
            error.status = 401;
        }
        next(error);
    }
   
}; 

module.exports = authenticate; 