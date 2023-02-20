const { Contact } = require('../../models');
const { NotFound } = require('http-errors'); 

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user; 
  const deletedContact = await Contact.findOneAndDelete({_id: contactId, owner: _id});
  if (!deletedContact) {
    throw new NotFound(`Contact with id=${contactId} was not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: "Contact was deleted",
    data: {
      deletedContact
    }
  })
};  

module.exports = removeById; 