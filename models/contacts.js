const HttpError = require("../helpers/HttpError");
const Joi = require("joi");
const Contact = require("../service/schemas/contact");
const pagination = require("../helpers/pagination");
const getFavorite = require("../helpers/getFavorite");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
  owner: Joi.required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const listContacts = async (page, limit, favorite) => {
  const contactsList = await Contact.find();
  if (page || limit) {
    return pagination(contactsList, page, limit);
  }
  if (favorite) {
    return getFavorite(contactsList, favorite);
  }
  return contactsList;
};

const getContactById = async (contactId) => {
  const searchedContact = await Contact.findOne({ _id: contactId });
  if (!searchedContact) {
    throw HttpError(404, "contact not found");
  }
  return searchedContact;
};

const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404, "contact not found");
  }
  return deletedContact;
};

const addContact = async (body) => {
  console.log(body);
  const validation = addSchema.validate(body);
  console.log(validation);
  if (validation.error) {
    throw HttpError(400, "missing required name field");
  }
  const contactToAdd = await Contact.create({
    ...body,
  });
  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  const validation = updateSchema.validate(body);
  if (validation.error) {
    throw HttpError(400, "missing fields");
  }
  const contactToUpdate = await Contact.findByIdAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
  if (!contactToUpdate) {
    throw HttpError(404, "contact not found");
  }
  return contactToUpdate;
};

const updateFavorite = async (contactId, body) => {
  if (!body) {
    throw new HttpError(400, "missing field favorite");
  }
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "contact not found");
  }
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
