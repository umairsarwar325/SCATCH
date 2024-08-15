const express = require("express");
const router = express.Router();
const ownersModel = require("../models/oweners_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middlewares/isLoggedIn")

if (process.env.NODE_ENV) {
  router.post("/create", async (req, res) => {
    const owners = await ownersModel.find();
    if (owners.length > 0) {
      res.status(500).send("can't create another owner");
    } else {
      const { fullName, email, password } = req.body;
      const createdOwner = await ownersModel.create({
        fullName: fullName,
        email: email,
        password: password,
      });
      res.send(createdOwner);
    }
  });
}

router.get("/",isLoggedIn, (req, res) => {
  res.send("owners");
});

module.exports = router;
