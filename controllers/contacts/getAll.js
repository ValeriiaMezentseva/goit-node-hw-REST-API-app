const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user; 
  const { page = 1, limit = 10, favorite} = req.query; 
  const skip = (page - 1) * limit; 
  if (req.query.favorite) {
    const favContacts = await Contact.find({ owner: _id, favorite }, "", { skip, limit: Number(limit) }).populate("owner", "_id email");
    res.json({
       status: 'success', 
    code: 200, 
    data: {
      result: favContacts
    }, 
    })
  }
  const contacts = await Contact.find({ owner: _id}, "", { skip, limit: Number(limit) }).populate("owner", "_id email");
    res.json({
    status: 'success', 
    code: 200, 
    data: {
      result: contacts
    }, 
  });
}; 

module.exports = getAll; 