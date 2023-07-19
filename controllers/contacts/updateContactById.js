const contacts = require("../../models/contacts");

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

module.exports = updateContactById;