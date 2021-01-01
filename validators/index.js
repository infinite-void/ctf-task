const joi = require('joi');

exports.signinValidator = (req, res, next) => {
        
        const signinSchema = joi.object().keys({
                email: joi.string().email({ tlds: { allow: false } }),
                pwd: joi.string().min(6)
        });

        const result = signinSchema.validate(req.body);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.registerValidator = (req, res, next) => {

};

exports.verifyValidator = (req, res, next) => {

};

exports.resetpassValidator = (req, res, next) => {

};

exports.forgotpassValidator = (req, res, next) => {

};