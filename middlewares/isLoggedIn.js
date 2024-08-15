const jwt = require("jsonwebtoken");
const userModel = require("../models/users_model");
const keys = require("../config/keys");

const isLoggedIn = async (req, res, next) => {
  try {
    let tokenFromBrowser = req.cookies.token;
    if (!tokenFromBrowser) {
      req.flash("error", "you need to login first");
      res.redirect("/");
    } else {
      let decodedToken = jwt.verify(req.cookies.token, keys.JWT_KEY);
      let user = await userModel
        .findOne({ email: decodedToken.email })
        .select("-password");
      if (user) {
        req.user = user;
        next();
      } else {
        req.flash("error", "you need to login first");
        res.redirect("/");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = isLoggedIn;
