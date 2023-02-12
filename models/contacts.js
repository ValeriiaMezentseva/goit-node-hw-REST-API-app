const path = require('path'); 
const fs = require('fs/promises'); 
const { v4: uuidv4 } = require('uuid');
const ID = uuidv4();

const contactsPath = path.resolve('models/contacts.json'); 


const listContacts = async () => {
  const res = await fs.readFile(contactsPath)
  return JSON.parse(res);
}; 


const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId)
  return contact || null;
};

const addContact = async (body) => {
   const contacts = await listContacts();
    const newContact = { id: ID, ...body};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (id, updateContact) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) {
    return null; 
  }
    contacts[index] = {id, ...updateContact,};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}; 

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}; 

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
