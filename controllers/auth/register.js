const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require('bcryptjs'); 
const gravatar = require('gravatar'); 

const register = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with this ${email} already exists`);
    }
    const avatarURL = gravatar.url(email); 
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ ...body, password: hashPassword , avatarURL});
    res.status(201).json({
        status: "success",
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL
        },
    });
};

module.exports = register; 