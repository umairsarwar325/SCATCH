const ownersModel = require("../models/oweners_model");
const productsModel = require("../models/products_model");
const bcrypt = require("bcrypt");

module.exports.createOwner = async (req, res) => {
  const owners = await ownersModel.find();
  if (owners.length > 0) {
    res.status(500).send("can't create another owner");
  } else {
    const { fullName, email, password } = req.body;

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
        const createdOwner = await ownersModel.create({
          fullName: fullName,
          email: email,
          password: hash,
        });
        if (createdOwner) {
          res.send(createdOwner);
        }
      });
    });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    let { name, price, discount, bgColor, panelColor, textColor } = req.body;
    let createdProduct = await productsModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    if (createdProduct) {
      req.flash("success", "Product created successfully");
      res.redirect("/owners/create-product");
    } else {
      req.flash("success", "Error creating product, please try again");
      res.redirect("/owners/create-product");
    }
  } catch (error) {
    req.flash("success", "Error creating product, please try again");
    res.redirect("/owners/create-product");
  }
};
