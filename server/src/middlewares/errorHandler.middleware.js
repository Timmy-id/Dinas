const { logger, AppError } = require('../utils');

const NotFoundError = (req, res, next) => {
  const err = new AppError(404, `Not Found - ${req.originalUrl}`);

  res.status(404);
  next(err);
};

const ErrorHandler = (err, req, res, next) => {
  try {
    let status = err.status ?? 500;
    let message = err.message ?? 'Something went wrong';

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
    );

    if (err.name === 'CastError') {
      status = 404;
      message = 'Resource not found';
    }

    res.status(status).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  } catch (err) {
    // eslint-disable-next-line callback-return
    next(err);
  }
};

module.exports = { NotFoundError, ErrorHandler };
