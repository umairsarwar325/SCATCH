const express = require("express");
const router = express.Router();
const ownersModel = require("../models/oweners_model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.render("index", { error: [] });
});
router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop", { products: [] });
});

module.exports = router;
