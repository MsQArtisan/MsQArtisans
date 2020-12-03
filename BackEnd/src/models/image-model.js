const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
const userInfoAndImage = mongoose.model("users", ImageSchema);
module.exports = userInfoAndImage;