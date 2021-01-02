const hash = require('salted-sha1');
const { nanoid } = require('nanoid');
const { v1: uuidv1 } = require("uuid");
const Mailer = require('../utilities/mailer');
const User = require('../models/users');

exports.register = (req, res, next) => {
        User.findOne({ email: req.body.email }, function (err, oldUser) {
                
                if(!oldUser) {
                        vsalt = uuidv1();
                        psalt = uuidv1();
                        
                        pwdhash = hash(req.body.pwd, psalt);
                        const document = {
                                uid: 0,
                                email: req.body.email,
                                name: req.body.name,
                                phone: req.body.phone,
                                pwd: pwdhash,
                                psalt: psalt,
                                vsalt: vsalt,    
                        };

                        const user = new User(document);
                        user.save( function (error){
                                
                                if(error)
                                        throw error;
                                
                                res.status(200).send({ message: 'User registered. Pls verify mail' });
                                console.log("User " + user.email + " registered.");
                                Mailer.emailer("Registration Successful", "You have been successfully registered.Click the link to verify- " + "<a href=\"https://srinath-ctf-task.herokuapp.com/api/auth/verify?vsalt=" + vsalt + "\">Verify</a>", user);
                                console.log("Sending Verification Mail to " + user.email);
                                next();
                        });
                }
                else {
                        return res.status(401).send({message: "User already exists"});
                }
        });
};

exports.verify = (req, res, next) => {
        User.findOne({ vsalt: req.query.vsalt }, function (err, user) {
        
                if(user) {
                        user.vsalt = uuidv1();
                        user.uid = nanoid();
                        user.save( function (error) {
                                
                                if(error) 
                                        throw error;
                                
                                res.status(200).send({ message: "Account Verified. Login to Continue."});
                                console.log("User " + user.email + " verified");
                        });
                }
                else {
                        return res.status(401).send({ message: "Bad Link"});
                }
        });
};