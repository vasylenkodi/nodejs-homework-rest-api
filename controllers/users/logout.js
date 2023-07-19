const users = require("../../models/users");

const logout = async (req, res, next) => {
    try {
        console.log(req.body);
    await users.findUser(req.body);
    await users.deleteToken(req.body);
    res.json({
      status: "No content",
      code: 201,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = logout;
