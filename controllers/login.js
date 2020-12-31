const hash = require('salted-sha1');
const { v1: uuidv1 } = require("uuid");
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