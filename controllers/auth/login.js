const { User } = require("../../models");
const { Unauthorized } = require('http-errors'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const { SECRET_KEY } = process.env; 


const login = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthorized("Email or password is wrong");
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
        throw new Unauthorized('Email or password is wrong');
    }

    const payload = {
        id: user._id,
    }; 
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' }); 
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: 'success',
        code: 200,
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
}; 

module.exports = login; 
