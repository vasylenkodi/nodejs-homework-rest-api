const users = require("../../models/users");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await users.login({
      email,
      password,
    });
      console.log(result);
    res.json({
      status: "logged in",
      code: 200,
      data: {
        token: result.token,
        user: {
          email: result.email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = login;