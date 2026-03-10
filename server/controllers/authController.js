const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  // Ensure password is not returned
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body

  // Check for user email via Mongo matching
  const user = await User.findOne({ email }).select('+password')

  // Use matching bcrypt mechanism
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
}

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logout = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'User logged out' })
}

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  if (!req.user) {
     res.status(401)
     throw new Error("No user found attached to request context.")
  }

  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  })
}

module.exports = {
  register,
  login,
  logout,
  getMe
}