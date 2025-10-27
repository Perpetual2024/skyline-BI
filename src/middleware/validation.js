const { body, param, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Validation rules for creating a user
const validateCreateUser = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 16 }).withMessage('Username must be between 3-16 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
    .custom(async (value) => {
      // Check for profanity or reserved words if needed
      const reserved = ['admin', 'root', 'system', 'null'];
      if (reserved.includes(value.toLowerCase())) {
        throw new Error('This username is reserved');
      }
      return true;
    }),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^(\+254|0)[17]\d{8}$/).withMessage('Invalid Kenyan phone number. Use format: 0712345678 or +254712345678'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email is too long'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .matches(/^(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one special character (!@#$%^&*)'),
  
  validate
];

// Validation rules for updating a user
const validateUpdateUser = [
  param('id')
    .isUUID('4').withMessage('Invalid user ID'),
  
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 16 }).withMessage('Username must be between 3-16 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^(\+254|0)[17]\d{8}$/).withMessage('Invalid Kenyan phone number'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email is too long'),
  
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)
    .withMessage('Password must include uppercase, lowercase, number, and special character'),

  
  validate
];

// Validation for user ID parameter
const validateUserId = [
  param('id')
    .isUUID(4).withMessage('Invalid user ID'),
  
  validate
];

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateUserId
};