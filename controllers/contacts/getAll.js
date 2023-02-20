const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user; 
  const { page = 1, limit = 10, favorite} = req.query; 
  const skip = (page - 1) * limit; 

  let favContacts = {}; 
  if (favorite) {
    if (favorite === "true") {
      favContacts = {
        favorite: true,
      };
    }
    if (favorite === "false") {
      favContacts = {
        favorite: false,
      };
    }
  }
  const contacts = await Contact.find({ owner: _id, ...favContacts}, "", { skip, limit: Number(limit) }).populate("owner", "_id email");
    res.json({
    status: 'success', 
    code: 200, 
    data: {
      result: contacts
    }, 
  });
}; 

module.exports = getAll; 