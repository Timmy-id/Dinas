require('dotenv').config();
const jwt = require('jsonwebtoken');
const { logger } = require('./logger.utils');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
  });
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
