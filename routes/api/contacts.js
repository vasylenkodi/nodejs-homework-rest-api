const express = require("express");
const ctrls = require('../../controllers/index')

const router = express.Router();

router.get("/", ctrls.getAllContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", ctrls.addContact);

router.delete("/:contactId", ctrls.removeContactById);

router.put("/:contactId", ctrls.updateContactById);

router.patch('/:contactId/favorite', ctrls.updateStatusContact);

module.exports = router;
