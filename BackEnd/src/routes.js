var express = require('express'),
    routes = express.Router();
var userController = require('./controller/artisans-controller');
var customerController = require('./controller/customer-controller');
var AuthCtrl = require('./controller/resetPassword-controller');
var imageCtrl = require('./controller/addImage-controller');
var passport = require('passport');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/account', userController.getUser);
routes.get('/allCustomers', customerController.getAllCustomers);
routes.post('/jobOrdersData', userController.addJobOrders)
routes.post('/allJobsAccepted', userController.allJobAccepted)
routes.post('/jobsToDelete', userController.deleteItem)

routes.post('/reqResetPassword', AuthCtrl.ResetPassword);
routes.post('/new-password', AuthCtrl.NewPassword);
routes.post('/valid-password-token', AuthCtrl.ValidPasswordToken);

routes.post('/imageUpload', imageCtrl.UploadImage);
routes.post('/getUserProfile', imageCtrl.GetUserProfile);
routes.get('/getAllData', imageCtrl.GetImageData);
routes.get('/', (req, res) => { res.send("True") });

routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


module.exports = routes;