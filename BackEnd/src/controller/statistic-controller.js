var statistics = require('../models/statistics')

let data = [{
    name: "Jessa",
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    amount: [3000, 5000, 7000, 2500, 5000, 6000, 3000, 5000, 3000, 1000, 5000, 9000]
}]

exports.getStatistics = (req, res) => {
        res.send({ status: true, data: data[0] })
    }
    // exports.getStatistics = (req, res) => {
    //     statistics.find({}, (err, data) => {
    //         if (err) {
    //             res.send({ error: err, status: false })
    //         } else {
    //             res.send({ status: true, stat: data })
    //         }
    //     })
    // }