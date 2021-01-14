const mongoose = require("mongoose");

const nameAndImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Array,
    required: true
  }
});
const userInfoAndImage = mongoose.model("users", nameAndImageSchema);
module.exports = userInfoAndImage;
