const express = require("express");
const router = express.Router();
const { shopController } = require("../controllers/shopController");
const { Cart,addToCart } = require("../controllers/userCart");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { logoutUser } = require("../controllers/authController");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});
router.get("/shop", isLoggedIn, shopController);
router.get("/cart", isLoggedIn, Cart);
router.get("/add-to-cart/:productId", isLoggedIn, addToCart);
router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;
