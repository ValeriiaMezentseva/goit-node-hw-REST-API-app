const { updateContact } = require('../../models/contacts'); 
const { NotFound } = require('http-errors'); 

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
        throw new NotFound(`Contact with id=${contactId} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            updatedContact
        }
    })
}; 

module.exports = updateById; 