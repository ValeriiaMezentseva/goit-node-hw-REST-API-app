const { Contact } = require('../../models');
const createError = require("http-errors");

const updateFavorite= async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body; 
    const { _id } = req.user; 
    const updatedContact = await Contact.findOneAndUpdate({_id: contactId, owner: _id}, { favorite }, { new: true }); 
     if (!updatedContact) {
        throw createError(404, `Contact with id=${contactId} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            updatedContact
        }
    })
}; 
 

module.exports = updateFavorite; 