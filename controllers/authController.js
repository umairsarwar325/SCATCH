const userModel = require("../models/users_model");
const ownerModel = require("../models/oweners_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullName } = req.body;
    let user = await userModel.findOne({ email: email });
    let owner = await ownerModel.findOne({ email: email });
    if (user || owner) {
      req.flash("error", "this email is already registered. please login");
      return res.redirect("/");
    }
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/");
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/");
        }
        let createdUser = await userModel.create({
          fullName,
          email,
          password: hash,
        });
        let token = generateToken(createdUser);
        res.cookie("token", token);
        return res.redirect("/shop");
      });
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    let owner = await ownerModel.findOne({ email: email });
    if (!user && !owner) {
      req.flash("error", "Incorrect email or password");
      return res.redirect("/");
    }
    let retrievedUser = user ? user : owner;
    bcrypt.compare(password, retrievedUser.password, (err, result) => {
      if (result) {
        let token = generateToken(retrievedUser);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        req.flash("error", "Incorrect email or password");
        return res.redirect("/");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    req.flash("error", "You are logged out");
    return res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};
