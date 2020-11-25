var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var FinishUser = require('../models/finishUser');
var emailholder="";
var handler;
 
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}
 
exports.registerUser = (req, res) => {
    
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }
 
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(user);
        });
    });
};
 
exports.loginUser = (req, res) => {
    emailholder=req.body.email;
    console.log("Email: ", emailholder);
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
    
    User.findOne({ email: req.body.email }, (err, user) => {
        
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
 
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        });
    });
};
exports.getUser = (req, res) => {
    User.find({ email: emailholder }, (err, user) => {
        console.log("INFo: ",user);
        
        if(err){
            return res.send({error:err, status: false})
            
            
          }else{
            return res.send({ status: true,data:user})
            
      
      
          }
    });
};

exports.addFinishUser = (req, res) => {
    const finishedUser = new FinishUser(req.body[0])

    try{
        finishedUser.save()
        console.log(finishedUser)
        handler = finishedUser
        res.send(finishedUser)
    }catch(err) {
        res.send(false)
    }
};

exports.getCompletedUser = (req, res) => {

    try{
        res.send(handler)
    }catch(err) {
        res.send(false)
    }
};

