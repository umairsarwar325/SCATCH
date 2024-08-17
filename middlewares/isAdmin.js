const jwt = require("jsonwebtoken");
const ownerModel = require("../models/oweners_model");
const keys = require("../config/keys");

const isAdmin = async (req, res, next) => {
  try {
    let tokenFromBrowser = req.cookies.token;
    if (!tokenFromBrowser) {
      req.flash("error", "you need to login first");
      return res.redirect("/");
    } else {
      let decodedToken = jwt.verify(req.cookies.token, keys.JWT_KEY);
      let owner = await ownerModel
        .findOne({ email: decodedToken.email })
        .select("-password");
      if (owner && owner.isAdmin) {
        req.owner = owner;
        next();
      } else {
        req.flash("error", "You are not admin");
        return res.redirect("/shop");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = isAdmin;
