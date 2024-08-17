const productsModel = require("../models/products_model");
const userModel = require("../models/users_model");
const adminCheck = require("./adminCheck");

module.exports.Cart = async (req, res) => {
  try {
    const AdminCheck = await adminCheck(req.user);
    if (AdminCheck) {
      req.flash("error", "Admin can not have cart");
      return res.redirect("/shop");
    }
    let userCart = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");
    if (userCart) {
      return res.render("cart",{userCart});
    } else {
      req.flash("error", "Can not open cart");
      return res.redirect("/shop");
    }
  } catch (error) {
    res.send("error loading products");
  }
};
module.exports.addToCart = async (req, res) => {
  try {
    const AdminCheck = await adminCheck(req.user);
    if (AdminCheck) {
      req.flash("error", "Admin can not have cart");
      return res.redirect("/shop");
    }
    let user = await userModel.findOne({ email: req.user.email });
    if (user) {
      user.cart.push(req.params.productId);
      await user.save();
      req.flash("error", "Added to cart");
      return res.redirect("/shop");
    } else {
      req.flash("error", "Can not add to cart");
      return res.redirect("/shop");
    }
  } catch (error) {
    res.send("error loading products");
  }
};
