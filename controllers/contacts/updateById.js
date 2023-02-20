const { Contact } = require('../../models');
const { NotFound } = require('http-errors'); 

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user; 
    const updatedContact = await Contact.findOneAndUpdate({_id: contactId, owner: _id}, req.body, {new: true});
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