/* -------------------------------------------------------------------------------------------
 Controllers for User's functionality are mapped in app.js to request URLs started with '/users'
 const users = require('./routers/users');//Gets users.js file from the app's relative path
 app.use('/users', users);						//Maps request URLs started from '/users' to users.js
------------------------------------------------------------------------------------------- */

//Import express library...
const exp_lib = require('express');
//...and instantiate a new router via Router() method from express library
const router = exp_lib.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//Make this instance of express.Router(), with all above described controllers,
//available anywhere in the application via 'require("users.js")'
module.exports = router;
