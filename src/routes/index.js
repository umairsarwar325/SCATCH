const express = require("express");
const router = express.Router();
const ownersModel = require("../models/oweners_model");

router.get("/", (req, res) => {
  res.render("index",{error:[]});
});

module.exports = router;
