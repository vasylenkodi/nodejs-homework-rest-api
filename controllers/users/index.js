const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');

const users = {
  register,
  login,
  logout,
  current,
  updateSubscription,
};

module.exports = users;