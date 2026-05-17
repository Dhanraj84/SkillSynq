const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ status: 'error', message: 'Email already exists' });
    }
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please provide email and password!' });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
    }

    // 3) If everything is ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
