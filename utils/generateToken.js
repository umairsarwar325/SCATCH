const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const generateToken = (user) => {
  return (token = jwt.sign({ email: user.email, id: user._id }, keys.JWT_KEY));
};

module.exports.generateToken = generateToken;
