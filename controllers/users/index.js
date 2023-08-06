const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const changeAvatar = require('./changeAvatar');
const verification = require('./verification');
const resendVerification = require('./resendVerification');

const users = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  changeAvatar,
  verification,
  resendVerification
};

module.exports = users;