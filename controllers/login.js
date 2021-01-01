const hash = require('salted-sha1');
const { v1: uuidv1 } = require("uuid");
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_ENCRYPTION = config.get('JWT_ENCRYPTION');  
const Mailer = require('../utilities/mailer');
const User = require('../models/users');


exports.signin = (req, res, next) => {
        User.findOne({ email: req.body.email }, function (err, user) {
                
                if(user) {
                        
                        cpwdhash = hash(req.body.pwd, user.psalt);
                        if(cpwdhash === user.pwd) {
                                        
                                if (user.uid == 0)
                                        return res.status(200).send({ message: 'User Signed in. Pls Verify mail' });
                                else {
                                        const token  = jwt.sign({ uid: user.uid }, JWT_ENCRYPTION);
                                        console.log("User " + user.email + " signed in.");
                                        return res.status(200).send({ message: 'User Signed in', authtoken: token });
                                }
                        }
                        else {
                                return res.status(400).send({ message: "Invalid Credentials." });
                        }
                }
                else {
                        return res.status(401).send({ message: "User doesnot exist. Register to proceed." });
                }
        });
};

exports.forgotpass = (req, res, next) => {
        User.findOne({ email: req.body.email }, function (err, user) {

                if (user) {
                        console.log("Sending password reset confirmation link to " + user.email + ".");
                        Mailer.emailer("Reset Password", "Click link to finish password reset: " + "<a href=\"http://localhost:3000/api/auth/resetpass?" + "salt=" + user.vsalt + "&pwd=" + req.body.pwd + "\">Reset password</a>", user);
                        res.status(200).send({ message: 'Link sent to mail,Click once to complete reset' });
                        next();
                }
                else {
                    return res.status(400).send({ message: 'User not found' });
                }
            });
};

exports.resetpass = (req, res, next) => {
        User.findOne({ vsalt: req.query.salt }, function (err, user) {
                console.log(user);

                if (user) {
                        user.vsalt = uuidv1();
                        user.pwd = hash(req.query.pwd, user.psalt);
                        user.uid = nanoid();

                        user.save( function (error) {
                                
                                if(error)
                                        throw error;
                                res.status(200).send({ message: 'Password reset successfully. Login to continue.' });
                                console.log("Password reset for user " + user.email + ".");
                                next();
                        });
                }
                else {
                    return res.status(401).send({ message: 'Bad link' });
                }
            });
};