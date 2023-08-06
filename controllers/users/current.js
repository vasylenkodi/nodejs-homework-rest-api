const users = require("../../models/users");

const current = async (req, res, next) => {
  try {
    console.log(req);
    const { authorization } = req.headers;
    const [_, token] = authorization.split(" ");
    const currentUser = await users.getCurrent(token);
    res.json({
      status: "Ok",
      code: 200,
      ResponseBody: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = current;
