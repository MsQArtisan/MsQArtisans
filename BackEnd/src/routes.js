var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/artisans-controller');
var customerController  = require('./controller/customer-controller');
var orderController  = require('./controller/orders-controller');
const AuthCtrl = require('./controller/resetPassword-controller');
var passport	    = require('passport');
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/account', userController.getUser);
routes.get('/allCustomers', customerController.getAllCustomers);
routes.post('/jobOrdersData', userController.addJobOrders)
routes.post('/allJobsAccepted', userController.allJobAccepted)
routes.post('/jobsToDelete', userController.deleteItem)
routes.get('/getNewOrder',orderController.getOrders )
routes.post('/reqResetPassword', AuthCtrl.ResetPassword);
routes.post('/new-password', AuthCtrl.NewPassword);
routes.post('/valid-password-token', AuthCtrl.ValidPasswordToken);

// routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
// });
 
module.exports = routes;