var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/config');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 5000;
// for other server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

var routes = require('./routes');
app.use('/api', routes);

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify:false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
// Start the server
app.listen(port);
console.log('MsQArtisan is listening on http://localhost:' + port);