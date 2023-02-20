const { Contact } = require('../../models');
const createError = require('http-errors'); 

const getById = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user; 
    const contact = await Contact.findOne({_id: contactId, owner: _id});
    if (!contact) {
        throw createError(404, `Contact with id=${contactId} was not found`); 
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contact
        },
    })
}; 

module.exports = getById; 