const contacts = require('../models/contacts');

const getAllContacts = async (req, res, next) => {
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
};

const getContactById = async (req, res, next) => {
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
};

const addContact = async (req, res, next) => {
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
};

const removeContactById = async (req, res, next) => {
  try {
    const idToDelete = req.params.contactId;
    const result = await contacts.removeContact(idToDelete);
    console.log(result);
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
};

const updateContactById = async (req, res, next) => {
  try {
    const idToPatch = req.params.contactId;
    const newData = req.body;
    const result = await contacts.updateContact(idToPatch, newData);
    res.json({
      status: "contact updated",
      code: 200,
      data: result,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const idToUpdate = req.params.contactId;
        const newStatus = req.body;
        const result = await contacts.updateFavorite(idToUpdate, newStatus);
        res.json({
            status: 'status updated',
            code: 200,
            data: result,
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message,
            code: error.status
        })
    }
}

const ctrls = {
  getAllContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
};

module.exports = ctrls;