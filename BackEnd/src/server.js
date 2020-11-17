// var express     = require('express');
// var bodyParser  = require('body-parser');
// var passport	= require('passport');
// var mongoose    = require('mongoose');
// var config      = require('./config/config');
// var port        = process.env.PORT || 5000; 
// var port2       = process.env.PORT || 5001; 

// var cors        = require('cors');

// var app = express();
// var app1 = express();
// app.use(cors());
// app1.use(cors());

// var server = require('http').createServer(app1);
// // var io = require('socket.io')(server);
 
// // get our request parameters
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
 

// // Use the passport package in our application
// app.use(passport.initialize());
// var passportMiddleware = require('./middleware/passport');
// passport.use(passportMiddleware);
 
// var routes = require('./routes');
// app.use('/api', routes);
 
// mongoose.connect(config.db, { useUnifiedTopology:true,useNewUrlParser: true , useCreateIndex: true});
 
// const connection = mongoose.connection;
 
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully!');
// });
 
// connection.on('error', (err) => {
//     console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//     process.exit();
// });

// app.use((err, req, res, next) => {
//     if (err.name === 'ValidationError') {
//         var valErrors = [];
//         Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
//         res.status(422).send(valErrors)
//     }
// });

// // app.use((req, res, next) => {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header(
// //     'Access-Control-Allow-Headers',
// //     'Origin, X-Requested-With, Content-Type, Accept'
// //     );
// //     next();
// // });

// // io.set( 'origins', '*localhost:5001' );

// var io = require("socket.io")(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });
// // start with Live chat
// io.on('connection', (socket) => {

//     socket.on('disconnect', function() {
//         io.emit('users-changed', { user: socket.username, event: 'left' });
//     });

//     socket.on('set-name', (name) => {
//         socket.username = name;
//         io.emit('users-changed', { user: name, event: 'joined' });
//     });

//     socket.on('send-message', (message) => {
//         io.emit('message', { msg: message.text, user: socket.username, createdAt: new Date() });
//     });
// });

// // Start the server
// app.listen(port);
// console.log('MsQArtisan is listening on port ' + port);

// // listening for live chat only
// server.listen(port2, () => {
//     console.log('Live chat is listening to port ' + port2);
// });


var express     = require('express');
var bodyParser  = require('body-parser');
var passport	  = require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var cors        = require('cors');
var app         = express();
var port        = process.env.PORT || 5000; 

// For Pusher
const Pusher    = require('pusher');

// const Sentiment = require('sentiment');
// const sentiment = new Sentiment();

const pusher = new Pusher({
  appId: "1106641",
  key: "9d4e34bbed57dbddf921",
  secret: "cc0d97cef7e12f74943c",
  cluster: "ap1",
  useTLS: true
});

const app1      = express();
const port1     = process.env.PORT || 5005;

app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: false }));
app1.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app1.post('/messages', (req, res) => {
  const { body } = req;
  const { text, id } = body;
  // const result = sentiment.analyze(text);
  // const comparative = result.comparative;
  // const tone =
  //   comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';
  const data = {
    text,
    id,
    timeStamp: new Date(),
  };
  pusher.trigger('chat', 'message', data);
  res.json(data);
});


// for other server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 
var routes = require('./routes');
app.use('/api', routes);



mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(); 
});

// Start the pusher server
app1.listen(port1, () => {
    console.log(`Pusher Server started on port ${port1}`);
  });
// Start the server
app.listen(port);
console.log('MsQArtisan is listening on http://localhost:' + port);