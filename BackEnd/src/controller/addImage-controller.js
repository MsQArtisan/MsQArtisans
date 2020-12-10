var Schema = require("../models/image-model");

exports.UploadImage = (req, res) => {
    const userData = new Schema(req.body);
    try {
        userData.save();
        res.send(true);
    } catch{
        res.send(false);
    }
}

exports.GetImageData = async (req, res) => {
    const userData = await Schema.find({});
    try {
        res.send(userData);
    } catch (err) {
        res.send(false);
    }
}


exports.GetUserProfile = async (req, res) => {
    const usersImage = await Schema.findOne({name: req.body.name})
    try {
        res.send(usersImage)
    }catch(err) {
        res.send(err)
    }
    
}
