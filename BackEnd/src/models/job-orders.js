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

module.exports = mongoose.model('jobs', jobOrdersSchema)

// jobTitle= "Massage";
// schedule= "Nov.10,2020 - 12:00pm - 5:00pm";
// location= "Nasipit Rd, Talamban Cebu";
// rate= "4000 Pesos";
// notes="Looking for a nanny for my 3 years old baby boy.";