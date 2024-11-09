const bcrypt = require('bcryptjs');
const {
  AppError,
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils');
const { User } = require('../../../db/models');

const registerUser = async (req, res, next) => {
  const { username, restaurantName, phone, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new AppError(409, 'User already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      restaurantName,
      phone,
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully.',
      data: newUser.getUser,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new AppError(400, 'Invalid email or password');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError(400, 'Invalid email or password');
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new AppError(400, 'Invalid email or password');
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully.',
      data: accessToken,
    });
  } catch (error) {
    return next(error);
  }
};

const logoutUser = async (_req, res) => {
  res.cookie('accessToken', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: 'success',
    message: 'User logged out successfully.',
  });
};

module.exports = { registerUser, loginUser, logoutUser };
