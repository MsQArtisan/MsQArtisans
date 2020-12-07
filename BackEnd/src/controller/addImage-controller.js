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
// app.post("/api/imageUpload", (req, res) => {
//     const usersData = new Schema(req.body);
//     try {
//         usersData.save();
//         res.send(true);
//     } catch (error) {
//         res.send(false);
//     }
// });

exports.GetImageData = async (req, res) => {
    const userData = await Schema.find({});
    try {
        res.send(userData);
    } catch (err) {
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

// exports.GetUserProfile =  (req, res) => {
//     const userData =  Schema.find({ name: req.body.name });
//     try {
//         res.send(userData);
//     } catch (err) {
//         res.send(false);
//     }
// }


exports.GetUserProfile = async (req, res) => {
    const usersImage = await Schema.findOne({name: req.body.name})
    try {
        res.send(usersImage)
    }catch(err) {
        res.send(err)
    }
    // Schema.find({ name: req.body.name }, (err, user) => {
    //     if (err) {
    //         return res.send({ error: err, status: false })
    //     } else {
    //         return res.send({ status: true, data: user })
    //     }
    // });
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