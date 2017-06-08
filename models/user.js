// Import required modules.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create the Schema
var userSchema = new Schema({
  //append the uniqueIdForSeries with date of time when it is created
    name:               {type: String},
    password:           {type: String},
    email :             {type: String}
});

// we need to create a model for using schema
var User = mongoose.model('user',userSchema);

// make this available to our application in our Node applications
module.exports = User;
