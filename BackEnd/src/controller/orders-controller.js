var Orders = require('../models/Bookings');
var idHolder = [];

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

exports.getCustomersData = (req, res) => {
    Orders.findOne({ _id: req.body.userId }).populate('author')
        .exec((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
}

exports.getIdHolder = (req, res) => {
    idHolder = req.body.id
    res.send(true)
}

exports.returnId = (req, res) => {
    res.send(idHolder)
}