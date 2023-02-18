const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require('bcryptjs'); 

const register = async (req, res) => {
    const body = req.body;
    const { email, password } = body; 
    const user = await User.findOne({ email }); 
    if (user) {
        throw new Conflict(`User with this ${email} already exists`); 
    }
    const hashPassword = bcrypt.hashSync(password, 10); 
    const newUser = await User.create({ ...body, password: hashPassword }); 
    res.status(201).json({
        status: "success", 
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    })
}

module.exports = register; 