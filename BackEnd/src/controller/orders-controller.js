var Orders = require('../models/Bookings');
var userTask= require('../models/taskOfEveryUsers')
var logsOfHistory = require('../models/logsHistory')
var incomeStats = require('../models/monthlyIncome')

exports.getOrders = (req, res) => {
    Orders.find({}, (err, orders) => {
        if (err) {
            return res.send({ error: err, status: false })
        } else {
            return res.send({ status: true, data: orders })

        }
    })
}
exports.getCustomersName = (req, res) => {
    Orders.find({}).populate('author')
        .exec((err, data) => {
            if (err) {
                return res.send({ error: err, status: false })
            } else {
                return res.send({ status: true, data: data })
            }
        })
}

//Get Customers Data
exports.getCustomersData = (req, res) => {
    Orders.findOne({_id: req.body.userId}).populate('author')
    .exec((err, data) => {
        if(err) {
            res.send(err)
        }else {
            res.send(data)
        }
    })
}

exports.acceptedJobToCompleted = (req, res) => {
    var dataToAdd = {
        currentTime: new Date(),
        cost: req.body.cost.customerId.cost,
        currentUser: req.body.currentUser
    }
    let dataAdd = new incomeStats(dataToAdd)
    dataAdd.save().then((retVal) => {
    })

    userTask.findByIdAndUpdate({_id:req.body.jobOffer},{state:req.body.state}, (err, result) => {
        res.send(result)
    })
}


exports.statistics = (req, res) => {
    incomeStats.find({currentUser: req.body.user}, (err, result) => {
        console.log(result)
        res.send(result)
    })
}

exports.allLogsHistory = (req, res) => {
    logsOfHistory.find({ logsOwner: req.body.currentUser}, (err, result) => {
        res.send(result)
    })
}

exports.deleteAllLogs = (req, res) => {
    logsOfHistory.deleteMany({}, (err, result) => {
        res.send(result)
    })
}

exports.checkRejected = (req, res) =>{
    var reject= [];
    userTask.find({currentUser:req.body.id}, (err, user) => {
        if (err) {
            return res.send({ error: err, status: false })
            
        } else {
            user.forEach(data=> {
                  if(data.currentUser==req.body.id && data.state=='rejected'){
                         reject.push(data);
               }     
            });

            return res.send({ status: true, data:reject})
        }

    });

}

exports.deleteAllStats = (req, res) => {
    incomeStats.deleteMany({}, (err, result) => {
        res.send(result)
    })
}

exports.taskDeletion = (req, res) => {
    userTask.deleteMany({}, (err, result) => {
        res.send(result)
    })
} 