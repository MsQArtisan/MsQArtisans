const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const port = process.env.PORT || 5005;
const app = express();


const pusher = new Pusher({
    appId: "1106641",
    key: "9d4e34bbed57dbddf921",
    secret: "cc0d97cef7e12f74943c",
    cluster: "ap1",
    useTLS: true
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// Start the pusher server
app.listen(port, () => {
    console.log(`Pusher Server started on port ${port}`);
});