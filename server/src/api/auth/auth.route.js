const express = require('express');
const { check } = require('express-validator');
const { Validate } = require('../../middlewares');

const { registerUser, loginUser, logoutUser } = require('./auth.controller');

const router = express.Router();

router.post(
  '/register',
  check('username').notEmpty().withMessage('Please enter your username'),
  check('restaurantName')
    .notEmpty()
    .withMessage('Please enter the name of your restaurant'),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  check('phone').notEmpty().withMessage('Please enter your phone number'),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password cannot be less than 8 characters'),
  Validate,
  registerUser,
);
router.post(
  '/login',
  check('email').isEmail().withMessage('Invalid credentials').normalizeEmail(),
  check('password').notEmpty().withMessage('Invalid credentials'),
  Validate,
  loginUser,
);
router.get('/logout', logoutUser);

module.exports = router;
