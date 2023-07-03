const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const HttpError = require("../helpers/HttpError");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  if (!searchedContact) {
    throw HttpError(404, "contact not found");
  }
  return searchedContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  console.log(contactsList);
  const indexToDelete = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  console.log(indexToDelete);
  if (indexToDelete < 0) {
    throw HttpError(404, "contact not found");
  }
  const deletedContact = contactsList.splice(indexToDelete, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return deletedContact;
};

const addContact = async (body) => {
  const validation = addSchema.validate(body);
  if (validation.error) {
    throw HttpError(400, "missing required name field");
  }
  const contactsList = await listContacts();
  const contactToAdd = {
    id: nanoid(),
    ...body,
  };
  contactsList.push(contactToAdd);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  const validation = updateSchema.validate(body);
  if (validation.error) {
    throw HttpError(400, "missing fields");
  }
  const contactsList = await listContacts();
  const contactToUpdate = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  console.log(contactToUpdate);
  if (contactToUpdate < 0) {
    throw HttpError(404, "contact not found");
  }
  const {
    name = contactsList[contactToUpdate].name,
    email = contactsList[contactToUpdate].email,
    phone = contactsList[contactToUpdate].phone,
  } = body;
  contactsList[contactToUpdate] = {
    id: contactId,
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactsList[contactToUpdate];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
