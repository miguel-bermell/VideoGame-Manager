const User = require("../models/User");

exports.insertUser = async (user) => {
  return await User.create(user);
};

exports.findUserWithPasswordByEmail = async (email) => {
  return await User.scope("withPassword").findOne({ where: { email } });
};
