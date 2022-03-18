//imports
var express = require('express');
var cors = require('cors')

var app = express();

//middleware
app.use(cors());

//routes
app.use(require('./routes'));

// catch bad requests
app.all('*', function(req, res) {
    throw new Error("Bad request")
})
app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({error: {msg: e.message}});
    }
});

module.exports = app;