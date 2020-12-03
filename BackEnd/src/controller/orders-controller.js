var Orders = require('../models/Bookings');

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