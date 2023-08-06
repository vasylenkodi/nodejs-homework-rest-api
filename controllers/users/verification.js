const users = require("../../models/users");

const verification = async (req, res, next) => {
  try {
    const verificationToken = req.params.verificationToken;
    const user = users.getByVerificationToken(verificationToken);
    res.json({
      status: "OK",
      code: 200,
      ResponseBody: {
        message: "Verification successful",
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = verification;
