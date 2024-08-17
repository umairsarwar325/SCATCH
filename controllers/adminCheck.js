const ownerModel = require("../models/oweners_model");

const adminCheck = async (user) => {
  let owner = await ownerModel.findOne({ email: user.email });
  if (owner && owner.isAdmin) {
    return true;
  }
  return false;
};

module.exports = adminCheck;
