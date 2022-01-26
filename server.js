const app = require("./app");
const mongoose = require('mongoose');

//prod env variable
var isProduction = process.env.NODE_ENV === 'prod';

// mongoose connection
var mongoConnectionUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/wz-mate-dev";
console.log('Attempting to connect to MongoDB with mongoose...')
mongoose.connect(mongoConnectionUrl , (err) => {
    if(!err)console.log('Mongoose connection success to: ' + mongoConnectionUrl);
    else console.log('Mongoose connection error: ' + err);
});
if(!isProduction){
    mongoose.set('debug', true);
}

// server start
var server = app.listen( process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});