const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: result,
      },
    });
  } catch (error) {
    res.json({
      status: "internal server error",
      code: 500,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: result,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: "contact not found",
      code: error.status,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contacts.addContact({ name, email, phone });
    res.json({
      status: "contact added",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const idToDelete = req.params.contactId;
    const result = await contacts.removeContact(idToDelete);
    res.json({
      status: "contact deleted",
      code: 200,
      data: result,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const idToPatch = req.params.contactId;
    const newData = req.body;
    const result = await contacts.updateContact(idToPatch, newData);
    res.json(
      {
        status: 'contact updated',
        code: 200,
        data: result,
      }
    );
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    })
  }
});

module.exports = router;
