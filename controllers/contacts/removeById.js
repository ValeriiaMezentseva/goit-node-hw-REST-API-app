const { removeContact } = require('../../models/contacts'); 
const { NotFound } = require('http-errors'); 

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
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