var User = require('../models/artisan-model');
var jobsFunction = require('../functions/built-in-functions')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var loggedusers = []
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
            return res.status(400).json({ 'msg': 'The email already exists' });
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
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user == null) {
            res.send({ type: false, msg: 'email' })
        } else {
            if (user.confirmPassword == req.body.password) {
                loggedusers.push(user)
                res.send({ type: true, token: createToken(user) , userId: user._id})
            } else {
                res.send({ type: false, msg: 'password' })
            }
        }
    })
};

exports.logoutUser = (req, res) => {
    let count = 0
    User.findOne({_id: req.body.user}, (err, user) => {
        loggedusers.forEach(element => {
            if(element._id != user._id) {
                count += 1
            }
        })
        loggedusers.pop(count)
    })
}
exports.getUser = (req, res) => {
    User.find({ _id: req.body.id }, (err, user) => {

        if (err) {
            return res.send({ error: err, status: false })


        } else {
            return res.send({ status: true, data: user })
        }
    });
}
exports.addJobOrders = (req, res) => {

    if (req.body.state == "accept") {
        loggedusers.forEach(element => {
            if(element._id == req.body.currentUser) {
                jobArray.push({ email: element.email, data: req.body.jobOffer })
            }
        });
    } else if (req.body.state == "completed") {
        loggedusers.forEach(element => {
            if(element._id == req.body.currentUser) {
                completedJob.push({ email: element.email, data: req.body.jobOffer })
            }
        });
    } else {
        loggedusers.forEach(element => {
            if(element._id == req.body.currentUser) {
                rejectedJob.push({ email: element.email, data: req.body.jobOffer })
            }
        });
    }
    res.send(true)
}
//array, request, toPassarray
exports.allJobAccepted = (req, res) => {
    let arrayToFront = []
    if (req.body.state == "accept") {
        res.send({ state: 'accept', jobs: jobsFunction.module(jobArray, req.body, arrayToFront, loggedusers)})
    } else if (req.body.state == "completed") {
        res.send({ state: 'completed', jobs: completedJob })
    } else {
        res.send({ state: 'reject', jobs: rejectedJob})
    }
}

exports.deleteItem = (req, res) => {
    jobArray.splice(req.body.index, 1)
}

exports.returnAllActiveUsers = (req, res) => {
    res.send(loggedusers)
}