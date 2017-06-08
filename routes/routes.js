//import the required modules
var express = require('express');
var router = express.Router();
var appController = require('../controllers/appController');

//API for users

//api for posting/add  the data of user
router.route('/signup')
  .post(appController.signup);

  router.route('/verification/:token')
  .get(appController.emailverify);

router.route('/login')
 .post(appController.login);


//export the router
module.exports = router;
