require('dotenv').config();
const express = require('express');
const app = express();

// Enable cross-origin resource sharing
// so that the API can be remotely tested by FCC
const cors = require('cors');
// Some legacy browsers choke on 204
app.use(cors({optionsSuccessStatus: 200}));

// Declare location of static assets (CSS, JS, images)
app.use(express.static('public'));


// Route requests for root to the index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// The first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'Hello, world!'});
});


/*
When user navigates to /api/whoami,
the server will return an object with the following:

ipaddress: 159.20.14.100
language:  en-US,en;q=0.5
software:  Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0

(Field values are provided as an example.)
*/
app.get('/api/whoami', function (req, res) {
  res.json({
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});


// Start server and listen for requests
const port = ('PORT' in process.env) ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log(`The app is listening on port ${port}.`);
});
