var mongoose = require('mongoose');
var router = require('express').Router();

var Gun = mongoose.model('Gun', new mongoose.Schema(), 'guns');

//get all gun data - /api/guns/all
router.get('/all', function(req, res){
  console.log('tryna get all guns')
  Gun.find({}, function(err, guns) {
    var gunMap = {};
    guns.forEach(function(gun) {
      gunMap[gun._id] = gun;
    });
    res.send(gunMap);  
  });
});

//get gun data by gun name - /api/guns/{name}
router.get('/:name', function(req, res){
  Gun.findOne({name: req.params.name}, function(err, gun) {
    res.send(gun);  
  });
});

module.exports = router;