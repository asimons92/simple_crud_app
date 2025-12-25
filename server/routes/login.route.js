const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

router.post('/',(req,res,next) => {
  if (!req.body || !req.body.email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const email = req.body.email;
  
  try {
    const user = User.findOne(({email:"test@test.com"})).exec();
  } catch (error) {
    res.status(401).json({error: 'Unauthorized'})
  }
  
})

module.exports = router;