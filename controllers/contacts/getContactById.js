const contacts = require("../../models/contacts");

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

module.exports = getContactById;