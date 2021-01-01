const joi = require('joi');
const { add } = require('../controllers/operations');

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
        
        let re = new RegExp('[0-9]*');

        const registerSchema = joi.object().keys({
                email: joi.string().email({ tlds: { allow: false } }).required(),
                pwd: joi.string().min(6).required(),
                name: joi.string().required(),
                phone: joi.string().length(10).regex(re).required(),
        });

        const result = registerSchema.validate(req.body);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.verifyValidator = (req, res, next) => {

        const verifySchema = joi.object().keys({
                vsalt: joi.string().required()
        });

        const result = verifySchema.validate(req.query);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.resetpassValidator = (req, res, next) => {

        const resetpassSchema = joi.object().keys({
                vsalt: joi.string().required(),
                pwd: joi.string().min(6).required()
        });

        const result = resetpassSchema.validate(req.query);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.forgotpassValidator = (req, res, next) => {
        
        const forgotpassSchema = joi.object().keys({
                email: joi.string().email({ tlds: { allow: false } }).required(),
                pwd: joi.string().min(6).required()
        });

        const result = forgotpassSchema.validate(req.body);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.addValidator = (req, res, next) => {
        
        const addSchema = joi.object().keys({
                name: joi.string().required(),
                quantity: joi.number().required()
        });

        const result = addSchema.validate(req.body);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.deleteValidator = (req, res, next) => {

        const deleteSchema = joi.object().keys({
                uid: joi.string().required()
        });

        const result = deleteSchema.validate(req.body);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.updateValidator = (req, res, next) => {
        
        const updateSchema = joi.object().keys({
                uid: joi.string().required(),
                quantity: joi.number().required()
        });

        const result = updateSchema.validate(req.body);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};

exports.findValidator = (req, res, next) => {
        
        const findSchema = joi.object().keys({
                uid: joi.string().required(),
        });

        const result = findSchema.validate(req.query);

        if(result.error)
                return res.status(400).send({ message: result.error });
        next();
};