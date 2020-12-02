var port = process.env.PORT || 5000;
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/config');
var cors = require('cors');
var app = express();
app.use(cors());
const Pusher = require('pusher');
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());


// For Pusher
const pusher = new Pusher({
  appId: "1106641",
  key: "9d4e34bbed57dbddf921",
  secret: "cc0d97cef7e12f74943c",
  cluster: "ap1",
  useTLS: true
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/messages', (req, res) => {
  const { body } = req;
  const { text, id } = body;
  const data = {
    text,
    id,
    timeStamp: new Date(),
  };
  pusher.trigger('chat', 'message', data);
  res.json(data);
});

app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

var routes = require('./routes');
app.use('/api', routes);


mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});
connection.on('error', (err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
});

// Start the server
server.listen(port);
console.log('MsQArtisan is listening on http://localhost:' + port);
