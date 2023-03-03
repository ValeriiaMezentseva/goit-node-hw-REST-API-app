const { User } = require('../../models'); 
const sendEmail = require("../../helpers/sendEmail"); 
const createError = require("http-errors"); 

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(404, `User with this email: ${email} was not found`);
    }

    if (user.verify) {
        throw createError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        subject: "Email verification",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}"> Verify your email </a>`

    };

    await sendEmail(verifyEmail);
    res.json({
        message: "Verification email sent"
    });
}; 

module.exports = resendVerifyEmail; 