const HttpError = require("../../helpers/HttpError");
const sendEmails = require("../../helpers/sendEmails");
const users = require("../../models/users");

const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw HttpError(400, "missing required field email");
    }
    const isVerified = users.checkIfVerified(email);
    if (isVerified) {
      throw HttpError(400, "Verification has already been passed");
    }
    await sendEmails({ email });
    res.json({
      status: "OK",
      code: 200,
      ResponseBody: {
        message: "verification email sent",
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = resendVerification;
