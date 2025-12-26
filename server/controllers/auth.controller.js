const dotenv = require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  if (!req.body || !req.body.email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const email = req.body.email;
  
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // verify password, generate JWT token, send response here
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

const register = async (req,res) => {
  if (!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.role) {
    return res.status(400).json({error: 'Bad Request'}) // Maybe split into specifics
  }
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role
  // check for duplicates
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  }).exec();
  if (existingUser) {
    if (existingUser.email === email) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (existingUser.username === username) {
      return res.status(400).json({ error: 'Username already exists' });
    }
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);  

  const new_user = {
    username: username,
    email: email,
    password: hash,
    role: role
  }
  // maybe implement mongoose presave middleware hook
  try {
    const createdUser = await User.create(new_user);
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role
      }
    });
  } catch (error) {
    // Handle MongoDB duplicate key errors (error code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }
    res.status(500).json({ error: 'Failed to register user' });
    return;
  }
}

module.exports = { login, register };

