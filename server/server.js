//'use strict';

/**
 * 
 * Send Emails Package
 * 
 * @Author: Noodlio (www.noodl.io) <noodlio@seipel-ibisevic.com>
 * @Version: 1.0
 * @Date: January 22, 2016
 * 
 * To use this package
 * 1. unzip the content to a workspace that supports nodejs
 * 2. run npm install
 * 3. Create an account on Mailgun.org
 * 4. Replace the Mailgun API keys (see line 22) in this package
 * 5. Host it to an instance such as Heroku (SERVER_SIDE_URL)
 * 6. Send a HTTP POST request to SERVER_SIDE_URL/email/send
 * 
 * To deploy to heroku, run:
 * $ git init
 * $ git add -A
 * $ git commit -m "update"
 * $ git push origin master
 * $ git push heroku master
 * 
 */
 
// Mailgun API keys
var API_KEY = 'key-a1e5d9a1658c2e9b78dfc3be04c865ae';
var DOMAIN = 'sandbox9b1eacee48da4d0cb7bc9d8c88eee410.mailgun.org';

// optional custom requirements
var qs         = require('querystring');
var request    = require('request');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var app         = express();
var router      = express.Router();              // get an instance of the express Router
// var port        = process.env.PORT || 9311;
var port        = process.env.PORT || 80;

// init nodemailer and mailgun transport
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// create the transport
var auth = {
  auth: {
    api_key: API_KEY,
    domain: DOMAIN
  }
}
var nodemailerMailgun = nodemailer.createTransport(mg(auth));

// standard CORS settings
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


router.post('/email/send', function(req, res) {
    
    console.log("--------- email/send")
    console.log("--------- email/send - from:", req.body.senderName + ' &lt;' + req.body.senderEmail + '&gt;')
    console.log("--------- email/send - to:", req.body.receiverEmail)
    console.log("--------- email/send - subject:", req.body.subject)
    console.log("--------- email/send - html:")
    
    nodemailerMailgun.sendMail({
      from: req.body.senderName + '<' + req.body.senderEmail + '>',
      to: req.body.receiverEmail, // An array if you have multiple recipients.
      subject: req.body.subject,
      html: req.body.html,
    }, function (err, info) {
      if (err) {
        console.log('Error: ' + err);
        res.json(err);
      }
      else {
        console.log('Response: ' + info);
        res.json(info);
      }
    });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router); // register our route
app.listen(port);
console.log('Magic happens on port ' + port);

