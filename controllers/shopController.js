const productsModel = require("../models/products_model");

module.exports.shopController = async (req, res) => {
  try {
    let products = await productsModel.find();
    if (products) {
      let error = req.flash("error");
      res.render("shop", { products, error });
    } else {
      res.send("error loading products");
    }
  } catch (error) {
    res.send("error loading products");
  }
};
