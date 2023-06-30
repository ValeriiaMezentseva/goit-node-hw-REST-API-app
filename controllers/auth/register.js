const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require('bcryptjs'); 
const gravatar = require('gravatar'); 
const jwt = require('jsonwebtoken'); 

const { SECRET_KEY } = process.env; 
// const { v4: uuidv4 } = require('uuid');
// const sendEmail = require('../../helpers/sendEmail'); 


const register = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with this email: ${email} already exists`);
    }
    // const verificationToken = uuidv4(); 
    // const avatarURL = gravatar.url(email);

    const defaultAvatarURL = `https://api.adorable.io/avatars/200/${encodeURIComponent(email)}.png`;
    const avatarURL = gravatar.url(email, { default: defaultAvatarURL });


    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ ...body, password: hashPassword, avatarURL});
    
    // const mail = {
    //     to: email,
    //     subject: "Email verification",
    //     html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"> Verify your email </a>`
    // };

    // await sendEmail(mail);
    
     const payload = {
        id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
        status: "success",
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL, 
        },
    });
};

module.exports = register; 


