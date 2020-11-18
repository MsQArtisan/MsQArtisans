var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    address: String,
    phone: Number,
    email: String,
    birth_date: Date,
    password: String,
    picture: String,
    id_image: String,
    id_number: Number
});

module.exports = mongoose.model('customers', CustomerSchema);