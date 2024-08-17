const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../config/multer");
const {
  createOwner,
  createProduct,
} = require("../controllers/ownerController");

if (process.env.NODE_ENV == "development") {
  router.post("/create", createOwner);
}

router.get("/create-product", isLoggedIn, isAdmin, (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

router.post(
  "/products/create",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  createProduct
);

module.exports = router;
