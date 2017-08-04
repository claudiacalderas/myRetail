var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CatalogItem = require('../models/catalogModel');

// gets catalog item from the database
router.get('/', function(req, res){
  console.log("/ catalog get route hit");
  CatalogItem.find({},function(err, allCatalogItems) {
    if(err) {
      console.log('Mongo error: ', err);
    }
    console.log('response is: ', allCatalogItems);
    res.send(allCatalogItems);
  });
});

module.exports = router;
