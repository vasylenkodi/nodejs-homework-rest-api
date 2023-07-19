const HttpError = require("../helpers/HttpError");
const Joi = require("joi");
const User = require("../service/schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const addUser = async (body) => {
  const validation = newUserSchema.validate(body);
  if (validation.error) {
    throw HttpError(400, "validation error");
  }
  const hashPassword = await bcrypt.hash(body.password, 10);
  const emailAlreadyExists = await User.findOne({ email: body.email });
  if (emailAlreadyExists) {
    throw HttpError(409, "email in use");
  }
  const newUser = await User.create({
    email: body.email,
    password: hashPassword,
  });
  return newUser;
};

const login = async (body) => {
  const validation = loginSchema.validate(body);
  if (validation.error) {
    throw HttpError(400, "validation error");
  }
  const userToFind = await User.findOne({ email: body.email });
  if (!userToFind) {
    throw HttpError(401, "email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(
    body.password,
    userToFind.password
  );
  if (!passwordCompare) {
    throw HttpError(401, "email or password is wrong");
  }
  const payload = {
    id: userToFind._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  userToFind.token = token;

  await User.findByIdAndUpdate(
    { _id: userToFind._id },
    { token: token },
    { new: true }
  );

  return userToFind;
};

const findUser = async (body) => {
  const userToFind = await User.findById(body.id);
  if (!userToFind) {
    throw HttpError(401, "Not authorized");
  }

  return userToFind;
};

const deleteToken = async (body) => {
  const userToLogout = await User.findByIdAndUpdate({ _id: body.id }, { token: '' }, { new: true });

  return userToLogout;
}

const getCurrent = async (token) => {
  const currentUser = await User.findOne({ token: token });
  if (!currentUser) {
    throw HttpError(404, 'user not found');
  }

  return currentUser;
}

const updateSubscription = async (subscription, userId) => {
  console.log(userId);
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { subscription: subscription },
    { new: true }
  );
  return user;
}

module.exports = {
  addUser,
  login,
  findUser,
  deleteToken,
  getCurrent,
  updateSubscription,
};
