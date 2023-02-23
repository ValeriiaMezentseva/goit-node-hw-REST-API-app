const { User } = require('../../models'); 
const path = require('path'); 
const fs = require('fs/promises'); 
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars'); 


const updateAvatar = async (req, res) => {
    const { _id } = req.user; 
    const { file } = req; 
       if (!file) {
        throw createError(400, "Avatar is required");
    }
    const { path: tempUpload, originalname } = file; 
    const imageName = `${_id}_${uuidv4()}${originalname}`; 

try {
    const resultUpload = path.join(avatarsDir, imageName); 
    await Jimp.read(tempUpload)
        .then((avatar) => {
            return avatar.resize(250, 250).write(resultUpload);
        })
        .catch((err) => {
            throw err;
        }); 
    await fs.rename(tempUpload, resultUpload); 
    const avatarURL = path.join('avatars', imageName); 
    await User.findByIdAndUpdate(_id, { avatarURL }, {new: true}); 
    res.json({avatarURL}); 
} catch (error) {
    await fs.unlink(tempUpload);
    throw error; 
    
}
}; 

module.exports = updateAvatar; 

