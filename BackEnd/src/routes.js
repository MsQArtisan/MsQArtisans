var express = require('express'),
    routes = express.Router();
var userController = require('./controller/artisans-controller');
var customerController = require('./controller/customer-controller');
var passport = require('passport');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/account',userController.getUser);
routes.post('/addUser', userController.addFinishUser);
routes.get('/finishUser', userController.getCompletedUser);
routes.post('/allJobsAccepted', userController.allJobAccepted);
routes.post('/jobsToDelete', userController.deleteItem);
routes.post('/jobOrdersData', userController.addJobOrders);
 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

module.exports = routes;