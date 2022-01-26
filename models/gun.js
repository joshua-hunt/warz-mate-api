var mongoose = require('mongoose');

var GunSchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  }
}, {timestamps: true});

mongoose.model('Gun', GunSchema);