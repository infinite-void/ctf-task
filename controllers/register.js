const User = require('../models/users');
const hash = require('salted-sha1');
const { v1: uuidv1 } = require("uuid");
const Mailer = require('../utilities/mailer');

exports.register = (req, res, next) => {
        User.findOne({email: req.body.email }).then(function (oldUser) {
        
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
                        console.log(document);
                        const user = new User(document);
                        user.save(function(error){
                                console.log(user);
                                if(error)
                                        throw error;
                                
                                res.status(200).send({ message: 'User registered. Pls verify mail' });
                                Mailer.emailer("Registration Successful", "You have been successfully registered.Click the link to verify- " + "<a href=\"http://localhost:3000/user/verify?salt=" + vsalt + "\">Verify</a>", user);
                                next();
                        });
                }
                else {
                        return res.status(401).send({message: "User already exists"});
                }
        });
};