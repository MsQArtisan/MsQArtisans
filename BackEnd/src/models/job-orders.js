const mongoose = require('mongoose')

const jobOrdersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    }
})
module.exports = ('jobs', jobOrdersSchema)
