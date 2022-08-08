const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const { v4: uuidv4 } = require('uuid');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contactById = list.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const contactIndex = list.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const updatedContacts = list.filter((__, index) => contactIndex !== index);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return list[contactIndex];
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
}

const actions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = actions;
