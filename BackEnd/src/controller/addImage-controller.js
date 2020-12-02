var Schema = require("../models/image-model");

exports.UploadImage = (req, res) => {
    const userData = new Schema(req.body);
    try{
        userData.save();
        res.send(true);
    }catch{
        res.send(false);
    }
}
// app.post("/api/imageUpload", (req, res) => {
//     const usersData = new Schema(req.body);
//     try {
//         usersData.save();
//         res.send(true);
//     } catch (error) {
//         res.send(false);
//     }
// });

exports.GetImageData = (req, res) => {
    const userData = new Schema.find({});
    try{
        res.send(userData);
    }catch(err){
        res.send(false);
    }
}
// app.get("/api/getAllData", async(req, res) => {
//     const usersData = await Schema.find({});

//     try {
//         res.send(usersData);
//     } catch (err) {
//         res.send(false);
//     }
// });

exports.GetUserProfile = (req, res) => {
    const userData = new Schema.find({ name: req.body.name });
    try{
        res.send(userData);
    }catch(err){
        res.send(false);
    }
}

// app.post("/api/getUserProfile", async(req, res) => {
//     const usersData = await Schema.find({ name: req.body.name })
//     try {
//         res.send(usersData)
//     } catch (err) {
//         res.send(false)
//     }
// })


// app.get("/", (req, res) => {
//     res.send("True");
// });

// module.exports = app;