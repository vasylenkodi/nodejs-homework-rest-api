const users = require("../../models/users");

const updateSubscription = async (req, res, next) => {
  try {
      const id = res.locals.user._id;
      const { subscription } = req.body;
    const result = await users.updateSubscription(subscription, id);
    res.json({
      status: "subscription updated",
      code: 200,
      data: {
        user: result,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = updateSubscription;
