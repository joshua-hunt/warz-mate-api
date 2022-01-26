var router = require('express').Router();

router.use('/guns', require('./guns'));
  
module.exports = router;