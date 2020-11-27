var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var routes = require('./routes');
var config = require('./config/config');
const port = process.env.PORT || 5010;
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api', routes)

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Start the server for password reset
server.listen(port, () => {
    console.log(`ResetPassword Server started on port ${port}`);
});

