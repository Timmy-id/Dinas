const { validationResult } = require('express-validator');
const { AppError } = require('../utils');

const Validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = {};
    errors.array().map((err) => (error[err.path] = err.msg));
    throw new AppError('422', error);
  }
  next();
};

module.exports = { Validate };
