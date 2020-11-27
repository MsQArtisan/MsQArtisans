const express = require('express');
const AuthCtrl = require('./controller/resetPassword-controller');
routes = express.Router();


routes.post('/reqResetPassword', AuthCtrl.ResetPassword);
routes.post('/new-password', AuthCtrl.NewPassword);
routes.post('/valid-password-token', AuthCtrl.ValidPasswordToken);

module.exports = routes;
