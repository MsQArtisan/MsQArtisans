const express = require('express')
const bodyParser = require('body-parser');
const app1 = express();
const port1 = process.env.PORT || 5005;
var messages = [];


const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1106641",
    key: "9d4e34bbed57dbddf921",
    secret: "cc0d97cef7e12f74943c",
    cluster: "ap1",
    useTLS: true
});


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
    messages.push(req.body);
    pusher.trigger('chat', 'message', messages);
    res.send(messages);
});

app1.get('/api/allMessages', (req, res) => {
    res.send(messages)
})

app1.listen(port1, () => {
    console.log(`Pusher Server started on port ${port1}`);
});