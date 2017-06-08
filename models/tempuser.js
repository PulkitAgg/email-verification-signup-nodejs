// Import required modules.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create the Schema
var tempUserSchema = new Schema({
  //append the uniqueIdForSeries with date of time when it is created
    name:               {type: String},
    password:           {type: String},
    email:              {type: String},
    token :             {type:String},
    verified :          {type: Boolean, default : false}
});

// we need to create a model for using schema
var tempUser = mongoose.model('tempuser',tempUserSchema);

// make this available to our application in our Node applications
module.exports = tempUser;
