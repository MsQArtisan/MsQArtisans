var User = require('../models/artisan-model');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var emailholder = "";
var jobArray = []
var completedJob = []
var rejectedJob = []

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400 //expires in 24 hours
    });
}

exports.registerUser = (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(user);
        });
    });
};

exports.loginUser = (req, res) => {
    emailholder = req.body.email;
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            return res.status(400).send({ 'msg': false });
        }

        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: 'The password is incorrect!' });
            }
        });
    })
};
exports.getUser = (req, res) => {
    User.find({ email: emailholder }, (err, user) => {

        if (err) {
            return res.send({ error: err, status: false })


        } else {
            return res.send({ status: true, data: user })
        }
    });
}
exports.addJobOrders = (req, res) => {
    if (req.body.state == "accept") {
        jobArray.push({ email: emailholder, data: req.body.jobOffer })
    } else if (req.body.state == "completed") {
        completedJob.push({ email: emailholder, data: req.body.jobOffer })
    } else {
        rejectedJob.push({ email: emailholder, data: req.body.jobOffer })
    }
    res.send(true)
}
exports.allJobAccepted = (req, res) => {
    if (req.body.state == "accept") {
        res.send(jobArray)
    } else if (req.body.state == "completed") {
        res.send(completedJob)
    } else {
        res.send(rejectedJob)
    }
}

exports.deleteItem = (req, res) => {
    jobArray.splice(req.body.index, 1)
}
