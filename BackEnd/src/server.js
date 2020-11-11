var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var port2       = process.env.PORT || 3001; 

var cors        = require('cors');
 
var app = express();
var app1 = express();
app.use(cors());

var server = require('http').createServer(app1);
var io = require('socket.io')(server);
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 

var routes = require('./routes');
app.use('/api', routes);
 
mongoose.connect(config.db, { useUnifiedTopology:true,useNewUrlParser: true , useCreateIndex: true});
 
const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
// start with Live chat
io.on('connection', (socket) => {

    socket.on('disconnect', function() {
        io.emit('users-changed', { user: socket.username, event: 'left' });
    });

    socket.on('set-name', (name) => {
        socket.username = name;
        io.emit('users-changed', { user: name, event: 'joined' });
    });

    socket.on('send-message', (message) => {
        io.emit('message', { msg: message.text, user: socket.username, createdAt: new Date() });
    });
});
 
// Start the server
app.listen(port);
console.log('MsQArtisan is listening on port ' + port);

// listening for live chat only
server.listen(port2, () => {
    console.log('Live chat is listening to port ' + port2);
});