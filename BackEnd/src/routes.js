var express = require('express'),
    routes = express.Router();
var userController = require('./controller/artisans-controller');
var orderController = require('./controller/orders-controller');
var statisticController = require('./controller/statistic-controller');

var AuthCtrl = require('./controller/resetPassword-controller');
var imageCtrl = require('./controller/addImage-controller');
var passport = require('passport');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/account', userController.getUser);
routes.post('/jobOrdersData', userController.addJobOrders);
routes.post('/allJobsAccepted', userController.allJobAccepted);
routes.post('/jobsToDelete', userController.deleteItem);

routes.get('/getNewOrder', orderController.getOrders);
routes.get('/getCustomersName', orderController.getCustomersName);
routes.post('/getCustomersData', orderController.getCustomersData);
routes.post('/idHolder', orderController.getIdHolder);
routes.get('/getId', orderController.returnId);

routes.post('/reqResetPassword', AuthCtrl.ResetPassword);
routes.post('/new-password', AuthCtrl.NewPassword);
routes.post('/valid-password-token', AuthCtrl.ValidPasswordToken);

routes.post('/imageUpload', imageCtrl.UploadImage);
routes.post('/getUserProfile', imageCtrl.GetUserProfile);
routes.get('/getAllData', imageCtrl.GetImageData);
routes.get('/', (req, res) => { res.send("True") });

routes.get('/getStat', statisticController.getStatistics);

routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


module.exports = routes;