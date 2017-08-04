var express = require('express');
var router = express.Router();
var path = require('path');

// BASE ROUTE
router.get('/', function(req,res){
    res.sendFile(path.resolve('server/public/views/index.html'));
});

// 404 HERE 

module.exports = router;
