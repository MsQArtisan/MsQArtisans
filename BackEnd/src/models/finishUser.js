var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var FinishUserSchema = new mongoose.Schema({
    customer: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: Date
    },
    jobTitle: {
        type: String
    },
    schedule: {
        type: String
    },
    location: {
        type: String
    },
    rate: {
        type: String
    },
    notes: {
        type: String
    }
});
module.exports = mongoose.model('completedUser', FinishUserSchema);