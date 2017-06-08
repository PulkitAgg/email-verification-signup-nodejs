var User = require('../models/user');
var tempUser = require('../models/tempuser');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'project.test02468@gmail.com',
    pass: 'pulkitagg1010'
  },
  tls: {
    rejectUnauthorized: false
  }
});


exports.signup = function(req, res) {

  // create the token
  var temptoken = jwt.sign(req.body, "MyOwnSecretKey", {
    expiresIn: 20000000
  });

  let link = "http://localhost:8888/api/verification/" + temptoken;
  console.log(link);
  let HelperOption = {
    from: '"Test Project" <project.test02468@gmail.com',
    to: req.body.email,
    subject: 'Verify Your Mail Id',
    text: 'Please click on this link ' + link
  };

  transporter.sendMail(HelperOption, (error, info) => {
    if (error) {
      console.log(error);
      res.json({
        msg: "Not send"
      });
      res.end();
    }
    console.log("Msg sent");
    //create the temoUSer
    var user = new tempUser({
      name: req.body.name,
      password: req.body.password,
      email : req.body.email,
      token: temptoken
    });

    user.save(function(error, response) {
      // handle the error
      if (error) {
        return error;
      } else {
        //send the response to the browser
        res.json({
          success: true,
          msg: 'Mail Send',
          body: response
        }); // end of response.
      } //end of else.
    }); // end of save method
  });
}



exports.emailverify = function(req,res){
  let receive_token = req.params.token;
  tempUser.findOne({token: receive_token},function(err,response){
    if(err){
      res.json(req,err,response);
      res.end();
    }
    else{
      if(response == null){
        res.json({
          msg:"User not exist",
          token : "Not verified"
        });
        res.end();
      }

      // if user is already hit the URL
      if(response.verified == true ){
        res.json({
          msg: "User is already created"
        });
        res.end();
      }
        var user = new User({
        name: response.name,
        password: response.password,
        email: response.email,
        verified: true
      });

      user.save(function(error, response) {
        // handle the error
        if (error) {
          return error;
        } else {
          //send the response to the browser
          res.json({
            success: true,
            body: response
          }); // end of response.
        } //end of else.
      }); // end of save method
    }
  })
}





exports.login = function(req, res) {
// console.log("In login");
  User.findOne({name: req.body.name, password: req.body.password },function(error,response){
    if(error){
      res.json({
        msg: "Error is generated",
        success : false
      });
      res.end();
    }
    else{
      console.log(response);
        if(response == null){
          console.log("Response in null");
          res.json({
            msg: "User does not exist",
            success : false
          });
          res.end();
        }
        else{
          res.json({success : true,response});
          res.end();
        }

    }
  });
}
