const express = require("express");
const ctrls = require('../../controllers/index');
const authenticate = require('../../middlewares/authenticate');

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrls.contacts.getAllContacts);

contactsRouter.get("/:contactId", authenticate, ctrls.contacts.getContactById);

contactsRouter.post("/", authenticate, ctrls.contacts.addContact);

contactsRouter.delete("/:contactId", authenticate, ctrls.contacts.removeContactById);

contactsRouter.put("/:contactId", authenticate, ctrls.contacts.updateContactById);

contactsRouter.patch('/:contactId/favorite', authenticate, ctrls.contacts.updateStatusContact);

module.exports = contactsRouter;
