const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_ENCRYPTION = config.get('JWT_ENCRYPTION');  
const User = require('../models/users');

exports.authenticateUser = (req, res, next) => {
        const token = req.headers['authorization'];
        
        if(!token) 
                return res.status(403).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, JWT_ENCRYPTION, (err, decoded) => {

                if (err){
                        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); //auth failure
                }
                if(!decoded.uid){
                        return res.status(403).send({ auth: false, message: 'Bad Request' });
                }

                User.findOne({ uid: decoded.uid }, function(err, user){
                        if(user) {
                                req.user = user;
                                console.log("Authenticated token for user " + user.email + '.');
                                next();
                        }
                        else{
                                return res.status(403).send({ auth: false, message: 'Bad Request' });    
                        }
                });
        });
};