const { NotFoundError, ErrorHandler } = require('./errorHandler.middleware');
const { Validate } = require('./requestValidator.middleware');
const Pagination = require('./pagination.middleware');
const AuthToken = require('./auth.middleware');

module.exports = {
  NotFoundError,
  ErrorHandler,
  Validate,
  Pagination,
  AuthToken,
};
