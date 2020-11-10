var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'full Name is required'
    },
    address: {
        type: String,
        required: 'address is required'
    },
    bday: {
        type: Date,
        required: 'Birth Day is required'
    },
    phone: {
        type: String,
        required: 'phone is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'email is required',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: 'password is required'
    },
    confirmPassword: {
        type: String,
        required: 'confirm password is required'
    },
    selfie: {
        type: String,
        required: 'selfie is required'
    },
    primaryIdPic: {
        type: String,
        required: 'primaryIdPic is required'
    },
    primaryIdNum: {
        type: String,
        required: 'primaryIdNum is required'
    },
    nbi: {
        type: String,
        required: 'nbi is required'
    },
    applyJob: {
        type: String,
        required: 'applyJob is required'
    }
});

UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
     if (!user.isModified('confirmPassword')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.confirmPassword, salt, function(err, hash) {
             if (err) return next(err);
 
             user.confirmPassword = hash;
             next();
         });
     });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);