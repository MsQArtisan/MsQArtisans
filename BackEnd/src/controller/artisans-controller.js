var User = require('../models/artisan-model');
var Orders = require('../models/Bookings')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var userTask = require('../models/taskOfEveryUsers')
var logsOfHistory = require('../models/logsHistory')
var loggedusers = []

function createToken(user) {
    return jwt.sign({ _id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 //expires in 24 hours
    });
}

exports.registerUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (user) {
            return res.status(400).json({ 'msg': 'The email already exists' });
        }
        const url = req.protocol + "://" + req.hostname + ':' + 5000 + '/' + 'uploads/';
        let artisan = new User(req.body);
    
        artisan['selfie'] = url + req.body.selfie;
        artisan['primaryIdPic'] = url +req.body.primaryIdPic;
        artisan['nbi'] = url + req.body.nbi;
        artisan.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(user);
        });
    });
};


exports.loginUser = (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            return res.status(400).send({ 'msg': false });
        }
        if (!user) {
            res.send({ type: false, msg: 'The user does not exist' });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                loggedusers.push(user)
                res.send({ type: true, token: createToken(user), userId: user._id })
            } else {
                res.send({ type: false, msg: 'The password is incorrect!' })
            }

        });
    })
};

exports.logoutUser = (req, res) => {
    let count = 0
    User.findOne({ _id: req.body.user }, (err, user) => {
        loggedusers.forEach(element => {
            if (element._id != user._id) {
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

//currentUserId, cost, currentDate
exports.addJobOrders = (req, res) => {
    var dataTOAdd = {
        logsOwner: req.body.currentUser,
        jobsOfferedThroughId: req.body.jobOffer._id
    }
    let dataAdd = new logsOfHistory(dataTOAdd)
    dataAdd.save((err, result) => { })

    Orders.findByIdAndUpdate({ _id: req.body.jobOffer._id }, { status: 'Ongoing' }, (err, result) => { })
    var sampleObject = {
        currentUser: req.body.currentUser,
        state: req.body.state,
        customerId: req.body.jobOffer._id
    }

    let usersTask = new userTask(sampleObject)
    usersTask.save((err, result) => {
        res.send(result)
    })
}

//Rejecting the jobToOrders
exports.rejectedJobOrders = (req, res) => {
    var dataTOAdd = {
        logsOwner: req.body.currentUser,
        jobsOfferedThroughId: req.body.jobOffer._id
    }
    let dataAdd = new logsOfHistory(dataTOAdd)
    dataAdd.save((err, result) => { })
    var sampleObject = {
        currentUser: req.body.currentUser,
        state: req.body.state,
        customerId: req.body.jobOffer._id
    }

    let usersTask = new userTask(sampleObject)
    usersTask.save((err, result) => {
        res.send(result)
    })
}

//array, request, toPassarray
exports.allJobAccepted = (req, res) => {
    userTask.find({ currentUser: req.body.user, state: "accept" }).populate('customerId')
        .exec((err, data) => {
            res.send(data)
        })
}

//all Completed Job Orders History Tracker 
exports.completedJob = (req, res) => {
    userTask.find({ currentUser: req.body.user, state: "completed" }).populate('customerId')
        .exec((err, data) => {
            res.send(data)
        })
}

//all Rejected Job Orders History Tracker
exports.rejectedJob = (req, res) => {
    userTask.find({ currentUser: req.body.user, state: "rejected" }).populate('customerId')
        .exec((err, data) => {
            res.send(data)
        })
}


//Delete Completed Task under Completed Tracker
exports.deletedCompletedTask = (req, res) => {
    userTask.deleteOne({ _id: req.body.deletedId }, (err, result) => {
        if (err) {
            res.jsonp({ success: false })
        }
        else {
            res.jsonp({ success: true })
        }
    })
}


//Restore Task  under Rejected History
exports.jobRestored = (req, res) => {
    Orders.find({ _id: req.body.restoreId }, (err, result) => {
        result.forEach(output => {
            if (output.status === 'Pending') {
                res.jsonp({ success: true })
            }
            else {
                res.jsonp({ success: false })
            }
        })
    })
}

exports.returnAllActiveUsers = (req, res) => {
    res.send(loggedusers)
}
