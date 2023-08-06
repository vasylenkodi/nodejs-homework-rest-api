const contacts = require("../../models/contacts");

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

module.exports = removeContactById;