const { Contact } = require('../../models');
const createError = require('http-errors');
const getByFavorite = async (req, res) => {
    const { _id } = req.user;
    
    const contacts = await Contact.find({ owner: _id, favorite: true }).populate("owner", "_id email");
    if (!contacts) {
        throw createError(404, "No contacts with these params found"); 
    }
    res.json({
    status: 'success', 
    code: 200, 
    data: {
      result: contacts
    }, 
  });
}; 

module.exports = getByFavorite; 