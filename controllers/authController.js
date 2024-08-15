const userModel = require("../models/users_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullName } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("user already exists. please login");
    }
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        res.send(err.message);
      }
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

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send("Incorrect email or password");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("loggedin");
      } else {
        return res.status(401).send("Incorrect email or password");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};
