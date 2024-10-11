const bcrypt = require('bcryptjs');
const { AppError, generateToken } = require('../../utils');
const { User } = require('../../../db/models');

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new AppError(400, 'Please enter the required fields');
    }

    if (password.length < 6 || password.length > 12) {
      throw new AppError(
        400,
        'Password cannot be less than 6 characters or more than 12 characters',
      );
    }

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
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully.',
      data: newUser,
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

    const accessToken = generateToken(user.id);

    res.cookie('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 56400),
    });

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully.',
      data: user.getUser,
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
