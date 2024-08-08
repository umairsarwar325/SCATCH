const userModel = require("../models/users_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = (req, res) => {
  try {
    let { email, password, fullName } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          res.send(err.message);
        }
        let createdUser = await userModel.create({
          fullName,
          email,
          password: hash,
        });
        let token = generateToken(createdUser);
        res.cookie("token", token);
        res.send(token);
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};
