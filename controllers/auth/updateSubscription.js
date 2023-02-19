const { User } = require('../../models');
const createError = require("http-errors");

const updateSubscription = async (req, res) => {
    const { _id} = req.user;
    const { subscription } = req.body; 
    const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true }); 
     if (!updatedUser) {
        throw createError(404, `Contact with id=${_id} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            updatedUser
        }
    })
}; 
 

module.exports = updateSubscription; 