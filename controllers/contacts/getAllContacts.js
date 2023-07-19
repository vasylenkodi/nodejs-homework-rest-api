const contacts = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const {page, limit, favorite }= req.query;
    const result = await contacts.listContacts(page, limit, favorite);
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

module.exports = getAllContacts;