const contacts = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const idToUpdate = req.params.contactId;
    const newStatus = req.body;
    const result = await contacts.updateFavorite(idToUpdate, newStatus);
    res.json({
      status: "status updated",
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

module.exports = updateStatusContact;