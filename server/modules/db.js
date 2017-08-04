var mongoose = require('mongoose');

// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI != undefined) {
  // use the string value of the environment variable
  mongoURI = process.env.MONGODB_URI;
} else {
  // use the local database server
  mongoURI = 'mongodb://localhost:27017/targetcasestudy';
}

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
