const contacts = require("../../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const id = res.locals.user._id;
    const { name, email, phone, favorite } = req.body;
    const result = await contacts.addContact({ name, email, phone, favorite, owner: id });
    console.log(result);
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

module.exports = addContact;