var express = require('express'),
    routes = express.Router();
var userController = require('./controller/artisans-controller');
var customerController = require('./controller/customer-controller');
var orderController = require('./controller/orders-controller');
var reviewsController = require('./controller/reviews-controller');
const AuthCtrl = require('./controller/resetPassword-controller');

routes.post('/logout', userController.logoutUser)
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/account', userController.getUser);

//check rejected under Usertask MOdel compared to Bookings model
routes.post('/checkRejected',orderController.checkRejected);

routes.get('/reviews', reviewsController.getReviews);
//Finishing the job after finish (FINISH BUTTON)

routes.post('/acceptedJobToCompleted', orderController.acceptedJobToCompleted )

routes.post('/allLogsHistory', orderController.allLogsHistory)

routes.get('/deleteAllLogs', orderController.deleteAllLogs)
routes.get('/deleteAllTasks', orderController.taskDeletion)
routes.get('/deleteAllStats', orderController.deleteAllStats)

//For Testing
// routes.get('/deleteAllLogs', orderController.deleteAllLogs)

routes.post('/jobOrdersData', userController.addJobOrders);

//Cancelling or Rejecting the jobOrders
routes.post('/rejectedJobOrders', userController.rejectedJobOrders);

//All Accepted Jobs history
routes.post('/allJobsAccepted', userController.allJobAccepted);

//All Completed Task or Job history Tracker
routes.post('/allCompletedJobs', userController.completedJob)

//AllRejectedJobs history Tracker
routes.post('/allRejectedJobs', userController.rejectedJob)


//Deleted Task Or Store Task under Rejected  History Tracker
routes.post('/deletedCompletedTask', userController.deletedCompletedTask)

//Restore Task 
 routes.post('/jobRestored', userController.jobRestored)

routes.post('/stats', orderController.statistics)

routes.get('/allActiveUsers', userController.returnAllActiveUsers)

routes.get('/getNewOrder', orderController.getOrders);

routes.get('/getCustomersName', orderController.getCustomersName);

routes.post('/getCustomersData', orderController.getCustomersData)

routes.post('/reqResetPassword', AuthCtrl.ResetPassword);

routes.post('/new-password', AuthCtrl.NewPassword);

routes.post('/valid-password-token', AuthCtrl.ValidPasswordToken);

// routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
// });

module.exports = routes;