const jwt = require('jsonwebtoken');
const { AppError } = require('../utils');

const AuthToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      throw new AppError(401, 'You are not authorized');
    }

    const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    req.userId = userId;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = AuthToken;
