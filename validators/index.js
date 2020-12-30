const { check } = require('express-validator');

exports.registerValidator = [
        
        check('name')
        .isLength({ min: 1})
        .withMessage('Name cannot be empty'),
        
        check('email').
        isEmail()
        .withMessage('E-mail is required')
        .trim()
        .normalizeEmail(),
        
        check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')      
];      