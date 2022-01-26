var express = require('express');

var app = express();

//gun model & route
require('./models/gun');
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