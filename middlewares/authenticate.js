const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");
const HttpError = require("../helpers/HttpError");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      next(HttpError(401, "not authorized"));
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      next(HttpError(401, "not authorized"));
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    res.locals.user = user;
    if (!user) {
      next(HttpError(401, "not authorized"));
    }
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
